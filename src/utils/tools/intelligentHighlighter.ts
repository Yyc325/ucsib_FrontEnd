interface IntelligentHighlighterOptions {
    caseSensitive?: boolean;
    highlightTag?: string;
    highlightClass?: string;
    partialMatchForShortWords?: boolean;
    shortWordThreshold?: number;
    matchPhrases?: boolean;
}

interface MatchPosition {
    keyword: string;
    positions: number[];
    matches: string[];
}

class IntelligentHighlighter {
    private options: Required<IntelligentHighlighterOptions>;

    constructor(options: IntelligentHighlighterOptions = {}) {
        this.options = {
            caseSensitive: false,
            highlightTag: 'mark',
            highlightClass: 'highlight',
            partialMatchForShortWords: true,
            shortWordThreshold: 3,
            matchPhrases: true,
            ...options
        };
    }

    /**
     * 高亮文本中的关键词（支持单词和短语）
     */
    public highlight(text: string, keywords: string | string[]): string {
        if (!keywords || !text) return text;

        const keywordList = Array.isArray(keywords) ? keywords : [keywords];
        const validKeywords = [...new Set(keywordList.filter(k => k && k.trim().length > 0))];

        if (validKeywords.length === 0) return text;

        let result = text;

        validKeywords.forEach(keyword => {
            const trimmedKeyword = keyword.trim();

            // 处理短语/句子匹配
            if (this.options.matchPhrases && trimmedKeyword.includes(' ')) {
                result = this.highlightPhrase(result, trimmedKeyword);
            } else {
                // 处理单词匹配
                result = this.highlightWord(result, trimmedKeyword);
            }
        });

        return result;
    }

    /**
     * 高亮短语/句子（始终忽略大小写）
     */
    private highlightPhrase(text: string, phrase: string): string {
        const escapedPhrase = this.escapeRegex(phrase);
        // 对于短语，直接匹配整个字符串，不限制边界，且始终忽略大小写
        const regex = new RegExp(`(${escapedPhrase})`, 'gi'); // 始终使用 'gi' 标志
        const replacement = `<${this.options.highlightTag} class="${this.options.highlightClass}">$1</${this.options.highlightTag}>`;

        return text.replace(regex, replacement);
    }

    /**
     * 高亮单词
     */
    private highlightWord(text: string, word: string): string {
        const escapedWord = this.escapeRegex(word);
        const pattern = this.buildPattern(word, escapedWord);
        // 单词匹配仍然遵循 caseSensitive 选项
        const regex = new RegExp(pattern, this.options.caseSensitive ? 'g' : 'gi');
        const replacement = `<${this.options.highlightTag} class="${this.options.highlightClass}">$1</${this.options.highlightTag}>`;

        return text.replace(regex, replacement);
    }

    /**
     * 构建匹配模式
     */
    private buildPattern(keyword: string, escapedKeyword: string): string {
        // 如果禁用短词部分匹配，或者关键词较长，使用单词边界
        if (!this.options.partialMatchForShortWords || keyword.length > this.options.shortWordThreshold) {
            return `(\\b${escapedKeyword}\\b)`;
        }

        // 对于短词，使用智能匹配策略
        if (keyword.length === 1) {
            // 单个字符：直接匹配
            return `(${escapedKeyword})`;
        } else if (keyword.length <= 3) {
            // 短词（2-3个字符）：允许部分匹配，但优先匹配单词开头
            return `(\\b${escapedKeyword}|${escapedKeyword}(?=\\w))`;
        }

        return `(${escapedKeyword})`;
    }

    /**
     * 转义正则表达式特殊字符
     */
    private escapeRegex(string: string): string {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * 批量高亮多个文本
     */
    public highlightMultiple(texts: string[], keywords: string | string[]): string[] {
        return texts.map(text => this.highlight(text, keywords));
    }

    /**
     * 获取匹配位置信息
     */
    public getMatchPositions(text: string, keywords: string | string[]): MatchPosition[] {
        if (!keywords || !text) return [];

        const keywordList = Array.isArray(keywords) ? keywords : [keywords];
        const validKeywords = [...new Set(keywordList.filter(k => k && k.trim().length > 0))];

        if (validKeywords.length === 0) return [];

        const results: MatchPosition[] = [];

        validKeywords.forEach(keyword => {
            const trimmedKeyword = keyword.trim();
            let regex: RegExp;

            if (this.options.matchPhrases && trimmedKeyword.includes(' ')) {
                // 短语匹配 - 始终忽略大小写
                const escapedKeyword = this.escapeRegex(trimmedKeyword);
                regex = new RegExp(escapedKeyword, 'gi');
            } else {
                // 单词匹配 - 遵循 caseSensitive 选项
                const escapedKeyword = this.escapeRegex(trimmedKeyword);
                const pattern = this.buildPattern(trimmedKeyword, escapedKeyword);
                regex = new RegExp(pattern, this.options.caseSensitive ? 'g' : 'gi');
            }

            const positions: number[] = [];
            const matches: string[] = [];
            let match: RegExpExecArray | null;

            regex.lastIndex = 0;
            while ((match = regex.exec(text)) !== null) {
                positions.push(match.index);
                matches.push(match[0]);
                // 避免零长度匹配的无限循环
                if (match.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
            }

            if (positions.length > 0) {
                results.push({
                    keyword: trimmedKeyword,
                    positions,
                    matches
                });
            }
        });

        return results;
    }

    /**
     * 检查文本是否包含关键词
     */
    public containsKeywords(text: string, keywords: string | string[]): boolean {
        if (!keywords || !text) return false;

        const keywordList = Array.isArray(keywords) ? keywords : [keywords];
        const validKeywords = [...new Set(keywordList.filter(k => k && k.trim().length > 0))];

        if (validKeywords.length === 0) return false;

        return validKeywords.some(keyword => {
            const trimmedKeyword = keyword.trim();

            if (this.options.matchPhrases && trimmedKeyword.includes(' ')) {
                // 短语匹配 - 始终忽略大小写
                const escapedKeyword = this.escapeRegex(trimmedKeyword);
                const regex = new RegExp(escapedKeyword, 'gi');
                return regex.test(text);
            } else {
                // 单词匹配 - 遵循 caseSensitive 选项
                const escapedKeyword = this.escapeRegex(trimmedKeyword);
                const pattern = this.buildPattern(trimmedKeyword, escapedKeyword);
                const regex = new RegExp(pattern, this.options.caseSensitive ? 'g' : 'gi');
                return regex.test(text);
            }
        });
    }

    /**
     * 更新配置选项
     */
    public updateOptions(newOptions: Partial<IntelligentHighlighterOptions>): void {
        this.options = {
            ...this.options,
            ...newOptions
        };
    }

    /**
     * 获取当前配置
     */
    public getOptions(): Required<IntelligentHighlighterOptions> {
        return { ...this.options };
    }

    /**
     * 专门用于短语匹配的方法（始终忽略大小写）
     */
    public highlightPhraseOnly(text: string, phrase: string): string {
        const escapedPhrase = this.escapeRegex(phrase);
        const regex = new RegExp(`(${escapedPhrase})`, 'gi');
        const replacement = `<${this.options.highlightTag} class="${this.options.highlightClass}">$1</${this.options.highlightTag}>`;

        return text.replace(regex, replacement);
    }

    /**
     * 测试方法 - 验证短语匹配的大小写忽略
     */
    public testPhraseCaseInsensitivity(text: string, phrase: string): boolean {
        const regex = new RegExp(this.escapeRegex(phrase), 'gi');
        const match = regex.test(text);

        console.log(`测试短语匹配大小写忽略:`);
        console.log(`  文本: "${text}"`);
        console.log(`  短语: "${phrase}"`);
        console.log(`  匹配结果: ${match}`);

        return match;
    }
}

// 导出类
export default IntelligentHighlighter;