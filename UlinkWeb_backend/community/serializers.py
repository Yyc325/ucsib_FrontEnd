from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'author', 'created_at']
        read_only_fields = ['id', 'author', 'created_at']

    def validate_content(self, value):
        content = value.strip()
        if len(content) < 2:
            raise serializers.ValidationError('评论至少需要2个字符')
        if len(content) > 500:
            raise serializers.ValidationError('评论不能超过500个字符')
        return content
