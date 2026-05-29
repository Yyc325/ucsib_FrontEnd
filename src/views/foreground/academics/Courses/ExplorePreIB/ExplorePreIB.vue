<template>
  <div class="w-full">
    <div class="flex items-center justify-center pt-12 pb-10 max-[576px]:pt-6 max-[576px]:pb-5">
      <div class="text-5xl text-header-color max-[576px]:text-2xl">
        Explore Pre-IB courses
      </div>
    </div>
    <div class="w-full mb-16">
      <div class="w-full">
        <div class="w-full rounded-3xl pt-8 pb-8 bg-history-bg/50">
          <div class="flex items-center justify-center text-4xl pb-8 max-[576px]:text-xl max-[576px]:pb-6">
            <span>Compulsory Subjects</span>
          </div>
          <div class="relative w-full overflow-hidden">
            <div class="w-auto h-max flex px-8 py-2 transform transition-transform max-[576px]:flex-col"
                 :style="{
              '--tw-translate-x':`-${22*currentIndex}rem`
            }">
              <div
                class="flex flex-col w-80 bg-history-bg shadow-lg rounded-xl flex-shrink-0 overflow-hidden pb-8 select-none max-[576px]:w-full max-[576px]:mr-auto max-[576px]:ml-auto"
                v-for="(subject,index) in compulsorySubjects" :key="subject.title"
                :class="{'min-[1440px]:mr-8':index !==compulsorySubjects.length-1,'max-[576px]:mb-8':index !==compulsorySubjects.length-1}">
                <div
                  class="flex-shrink-0 flex items-center justify-center pt-8 text-3xl pb-4 max-[576px]:text-xl max-[576px]:pt-4 max-[576px]:pb-2">
                  {{ subject.title }}
                </div>
                <div
                  class="flex-1 text-center text-ellipsis line-clamp-12 pl-4 pr-4 whitespace-break-spaces max-[576px]:text-sm">
                  {{ subject.content }}
                </div>
              </div>
            </div>
            <div
              class="absolute top-1/2 left-0 bg-black/40 w-8 h-8 flex items-center justify-center hover:cursor-pointer max-[576px]:hidden"
              @click="previous">
              <i class="iconfont icon-arrow-left-bold"></i>
            </div>
            <div
              class="absolute top-1/2 right-0 bg-black/40 w-8 h-8 flex items-center justify-center hover:cursor-pointer max-[576px]:hidden"
              @click="next">
              <i class="iconfont icon-arrow-right-bold"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div class="w-full flex justify-center items-center mb-12">
        <div class="text-4xl text-white pt-4 pb-4 pl-12 pr-12 bg-tbg max-[576px]:text-xl">
          Elective Subjects
        </div>
      </div>
      <div class="w-full">
        <div class="w-full rounded-3xl bg-history-bg/50 mb-12 pb-6" v-for="subject in electiveSubjects"
             :key="subject.title">
          <div class="flex items-center justify-center text-3xl pt-6 pb-10 max-[576px]:text-xl">{{
              subject.title
            }}
          </div>
          <div class="grid pl-8 pr-8 pb-12 max-[576px]:flex  max-[576px]:flex-col max-[576px]:pb-6"
               :class="subject.wrapperClass">
            <div
              class="shadow-lg pb-8 flex-1 bg-history-bg flex flex-col items-center  pl-8 pr-8 text-center max-[576px]:mb-6"
              :class="subject.cardClass" v-for="(article,index) in subject.articles" :key="index">
              <div class="text-2xl pt-4 pb-6">{{ article.title }}</div>
              <div class="">{{ article.content }}</div>
            </div>
          </div>
          <div class="flex items-center justify-center">
            <div class="bg-tbg pt-2 pb-2 pl-16 pr-16 text-white text-2xl rounded-full">Advance to IBDP</div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div class="w-full flex justify-center items-center mb-12 max-[576px]:mb-6">
        <div class="text-4xl text-white pt-4 pb-4 pl-12 pr-12 bg-tbg max-[576px]:text-xl">
          Featured Courses
        </div>
      </div>
      <div class="w-full flex justify-center pb-16 max-[576px]:pb-8">
        <div class="w-3/5 text-center max-[576px]:w-full max-[576px]:text-sm">
          UCS IB offers foundational courses in Extended English and Extended Math at the Pre-IB level. These are
          designed to help students build a strong foundation and develop adaptable skills in both subjects.
        </div>
      </div>
      <div class="flex items-center justify-center mb-12 max-[576px]:mb-6">
        <div class="text-4xl max-[576px]:text-xl">Extended English</div>
      </div>
      <div
        class="extend-course w-full grid grid-rows-8 grid-flow-col gap-8 mb-16 text-lg max-[576px]:mb-8 max-[576px]:flex max-[576px]:flex-col">
        <div class="row-span-2 col-span-6 bg-history-bg/30 p-8 shadow-lg flex max-[576px]:p-4">
          <div class="flex flex-col items-center text-center break-keep max-[576px]:text-sm">
            <div>Assessment Methods</div>
            <p>• ATL (Approaches to Learning) skills – Classroom discussions, individual presentations</p>
            <p>• Assignments / Project-based activities</p>
            <p>• In-class quizzes Final exam</p>
          </div>
          <div class="flex flex-shrink-0 items-center max-[576px]:hidden">
            <div class="w-28 h-36 mr-4">
              <img class="h-full object-cover" src="https://website.xycloud.net.cn/images/english-1.jpg" alt="">
            </div>
            <div class="w-28 h-36 mr-4">
              <img class="h-full object-cover" src="https://website.xycloud.net.cn/images/english-2.jpg" alt="">
            </div>
            <div class="w-28 h-36">
              <img class="h-full object-cover" src="https://website.xycloud.net.cn/images/english-3.jpg" alt="">
            </div>
          </div>
        </div>
        <div
          class="row-span-6 col-span-3 bg-history-bg/30 shadow-lg flex flex-col items-center justify-center px-8 py-8 text-center break-keep leading-8 max-[576px]:p-4 max-[576px]:text-sm">
          <p class="text-xl mb-4">Teaching Methods</p>
          <p>• Lecture-style teaching – Teacher-led explanations of complex concepts or knowledge points</p>
          <p>• Gamified learning – Kahoot quizzes for vocabulary and grammar reinforcement, energizing the classroom and
            encouraging healthy competition</p>
          <p>• Task-based teaching – Theme-based application activities (e.g., mini-program design and promotion) to
            foster
            creativity and teamwork</p>
          <p>• Content and Language Integrated Learning (CLIL) – Acquiring language through subject knowledge (e.g.,
            culture, history, philosophy), such as English cultural concept presentations</p>
        </div>
        <div class="w-104 row-span-3 col-span-3 shadow-lg max-[576px]:w-full max-[576px]:overflow-hidden">
          <img class="h-full object-contain max-[576px]:w-full max-[576px]:h-auto"
               src="https://website.xycloud.net.cn/images/english-center.jpg" alt="">
        </div>
        <div
          class="row-span-3 col-span-6 bg-history-bg/30 shadow-lg flex flex-col items-center px-8 py-8 text-center break-keep leading-8 max-[576px]:p-4 max-[576px]:text-sm">
          <p class="text-xl mb-4">Key Topics and main content:</p>
          <p>• Theme-based application activities for English B (e.g., radio interview shows, mini-program design and
            promotion, event poster exhibitions)</p>
          <p>• Grammar extension (sentence structures, participles, attributive clauses, inversion, etc.)</p>
          <p>• Vocabulary expansion (TOEFL & IELTS level)</p>
          <p>• Multi-genre reading (speeches, journals, short stories, news reports, etc.)</p>
          <p>• Cultural extension in English (Pandora’s Box, Noah’s Ark, Oedipus Complex, Trojan Horse, etc.)</p>
        </div>
        <div
          class="row-span-5 col-span-3 bg-history-bg/30 shadow-lg flex flex-col items-center px-12 py-8 text-center break-keep leading-8 max-[576px]:p-4 max-[576px]:text-sm">
          <p class="text-xl mb-4">Core Purpose：</p>
          <p>Extended English are small-group classes offered twice a week for Pre-ib students.
            It is designed to provide students with additional language support and helping them achieve a balance
            between
            interest development and skill enhancement.</p>
          <p>• English B Extension: Apply understanding of the five major English B themes in practical contexts</p>
          <p>• Strengthen language foundations to prepare for standardized tests(SAT, TOEFL, IELTS)</p>
          <p>• Supplement cultural knowledge in English, broaden intellectual horizons and foster interest in
            language-learning</p>
        </div>
      </div>
      <div class="flex items-center justify-center mb-12 max-[576px]:mb-6">
        <div class="text-4xl max-[576px]:text-xl">Extended Math</div>
      </div>
      <div
        class="extend-math w-full grid grid-rows-8 grid-cols-11 gap-8 mb-16 text-lg max-[576px]:mb-8 max-[576px]:flex max-[576px]:flex-col">
        <div
          class="col-start-1 col-end-5 row-start-1 row-end-6 bg-history-bg/30 shadow-lg flex flex-col justify-center text-base p-8 break-keep max-[576px]:p-4 max-[576px]:text-sm">
          <p>Course Introduction:</p>
          <p>Mathematics Extension</p>
          <p>The Mathematics Extension course serves multiple purposes. It incorporates extensive reading and
            problem-solving with English mathematical materials to accelerate students' transition and supplement their
            learning in both mathematical language and content.</p>
          <p>Aligned with the IB Learner Profile, the course requires students to think, learn, and apply mathematics
            from diverse perspectives. It features hands-on experiments for inquiry, where each student engages in group
            discussions, collaborative testing, data recording, graphing, and analysis, mastering the fundamental steps
            of mathematical exploration.</p>
          <p>
            Through progressively challenging inquiry-based problems and mathematical modeling, the course develops
            students' abilities in material analysis, pattern observation, and constructing models to solve practical
            mathematical problems.
          </p>
        </div>
        <div
          class="col-start-1 col-end-8 row-start-6 row-end-9 bg-history-bg/30 p-8 shadow-lg flex break-all max-[576px]:text-sm">
          This instructional unit integrates core mathematical knowledge with comprehensive skill development. In terms
          of content, it systematically covers linear relations, three-dimensional geometry, permutations and
          combinations, statistics and probability, vectors, geometric transformations, circular functions, Voronoi
          diagrams, and graphing calculator applications. The curriculum is designed to strengthen students' conceptual
          understanding while developing their analytical capabilities through mathematical reading comprehension,
          inquiry-based problem-solving, and mathematical modeling. Additionally, the course emphasizes collaborative
          learning and academic expression through structured group discussions and mathematical presentations,
          preparing students for advanced studies through a balanced approach of theoretical knowledge and practical
          application.
        </div>
        <div
          class="col-start-5 col-end-11 row-start-1 row-end-3 bg-history-bg/30 shadow-lg max-[576px]:flex-1">
          <div class="grid grid-cols-3 grid-rows-1 p-8 gap-16 max-[576px]:gap-4 max-[576px]:p-4">
            <img class="h-32  max-[576px]:h-auto object-contain" src="https://website.xycloud.net.cn/images/math-1.jpg"
                 alt="">
            <img class="h-32  max-[576px]:h-auto object-contain" src="https://website.xycloud.net.cn/images/math-2.jpg"
                 alt="">
            <img class="h-32 max-[576px]:h-auto object-contain" src="https://website.xycloud.net.cn/images/math-3.png"
                 alt="">
          </div>
        </div>
        <div class="row-span-3 col-span-3 bg-history-bg/30 p-4 shadow-lg text-base max-[576px]:flex-1">
          <p>The course focuses on:</p>
          <p>· Reading and comprehending English mathematical materials</p>
          <p>· Supplementary mathematical content and mathematical thinking</p>
          <p>· Exploration and research</p>
          <p>· Problem-solving and mathematical connections</p>
          <p>· Group communication</p>
          <p>· Introduction to academic writing (essays)</p>
          <p>· Introduction to mathematical modeling</p>
        </div>
        <div
          class="col-start-8 col-end-11 row-start-3 row-end-9 bg-history-bg/30 shadow-lg flex flex-col items-center px-12 py-8 text-center break-keep leading-8">
          <div class="h-full flex flex-col justify-center items-center max-[576px]:h-fit">
            <div class="mb-16">
              <img class="h-full object-contain max-[576px]:h-auto"
                   src="https://website.xycloud.net.cn/images/math-4.jpg" alt="">
            </div>
            <div>
              <img class="h-full object-contain max-[576px]:h-auto"
                   src="https://website.xycloud.net.cn/images/math-5.png" alt=""></div>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center mb-12 max-[576px]:mb-6">
        <div class="text-4xl mb-8 max-[576px]:text-2xl max-[576px]:mb-4">AP-integrated class</div>
        <div class="text-center text-shadow max-[576px]:text-sm">UCS IB further runs an AP-integrated stream in Pre-IB.
          Enrollment is
          selective,with students screened through a multi-level examination to qualify.
        </div>
      </div>
      <div class="mb-16">
        <div class="flex pb-12 max-[576px]:flex-col">
          <div
            class="flex-9 bg-history-bg/30 mr-16 shadow-lg rounded-sm p-8 text-center max-[576px]:mr-0 max-[576px]:mb-6">
            <div class="text-4xl mb-4 max-[576px]:text-xl">Math</div>
            <div class="text-xl max-[576px]:text-sm">This Pre-IB Mathematics & AP-integrated course covers the standard
              Pre-IB curriculum
              while
              incorporating Pre-calculus and AP Calculus AB. It fosters a deep conceptual understanding of functions and
              calculus, applying math to real-world contexts to develop comprehensive analytical skills. Upon
              completion, students are well-prepared to meet the challenges of IBDP Mathematics and possess the
              knowledge and problem-solving skills required for the AP Calculus AB exam.
            </div>
          </div>
          <div class="flex-8 bg-history-bg/30 shadow-lg rounded-sm p-8 text-center">
            <div class="text-4xl mb-4 max-[576px]:text-xl">Economics</div>
            <div class="text-xl max-[576px]:text-sm">This Pre-IB Economics & AP-integrated course delves into the
              decision-making behaviors
              of individuals
              and firms in specific markets. Students will systematically master core economic principles, analyze
              resource allocation mechanisms, and evaluate policy impacts. The course not only establishes a solid
              foundation for IBDP Economics but also develops comprehensive academic skills through thematic
              presentations, essay writing, multiple-choice practice, and structured questions—providing thorough
              preparation for the AP Microeconomics exam.
            </div>
          </div>
        </div>
        <div class="flex max-[576px]:flex-col">
          <div class="flex-7 bg-history-bg/30 shadow-lg rounded-sm p-8 text-center max-[576px]:flex-1 max-[576px]:mb-4">
            <div class="text-4xl mb-4 max-[576px]:text-xl">Chemistry</div>
            <div class="text-xl max-[576px]:text-sm">This Pre-IB & AP Chemistry course builds a strong foundation in
              core concepts and
              experimental skills. Students learn to solve complex problems through hands-on labs and critical thinking,
              preparing them for both IBDP Chemistry and the AP Chemistry exam. Key college-level topics are covered
              through lectures, discussions, and research.
            </div>
          </div>
          <div
            class="flex-2 ml-6 mr-6 max-[576px]:flex-1 max-[576px]:flex max-[576px]:m-0 max-[576px]:mb-4 max-[576px]:flex-1">
            <img class="flex-5 mb-6 max-[576px]:mb-0 max-[576px]:flex-1 max-[576px]:h-48 max-[576px]:mr-4"
                 src="https://website.xycloud.net.cn/images/Chemistry-1.png" alt="">
            <img class="flex-4 max-[576px]:flex-1 max-[576px]:h-48"
                 src="https://website.xycloud.net.cn/images/Chemistry-2.png" alt="">
          </div>
          <div class="flex-6 bg-history-bg/30 shadow-lg rounded-sm p-8 text-center max-[576px]:flex-1 max-[576px]:mb-4">
            <div class="text-4xl mb-4 max-[576px]:text-xl">Physics</div>
            <div class="text-xl max-[576px]:text-sm">This Pre-IB & AP Physics course builds deep conceptual
              understanding and experimental
              skills, creating a strong foundation for IBDP Physics. With a significant focus on hands-on laboratory
              work, students develop practical abilities while mastering content aligned with the AP Physics 1
              curriculum. This integrated approach ensures thorough preparation for both IBDP challenges and the AP
              Physics 1 exam.
            </div>
          </div>
          <div class="flex-2 flex flex-col ml-6 mr-6">
            <img class="flex-1 mb-6" src="https://website.xycloud.net.cn/images/Physics-1.png" alt="">
            <img class="flex-1 mb-6" src="https://website.xycloud.net.cn/images/Physics-2.png" alt="">
            <img class="flex-1" src="https://website.xycloud.net.cn/images/Physics-3.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'

export default defineComponent({
  name: "ExplorePreIB",
  setup: function () {
    const state = reactive({
      currentIndex: 0,
      compulsorySubjects: [
        {
          title: 'TOK',
          content: 'Theory of Knowledge (TOK), a core IB requirement, trains students in critical and independent thinking. It focuses on exploring how we know what we know, examining knowledge questions from multiple perspectives rather than seeking fixed answers.'
        },
        {
          title: 'English',
          content: 'This course builds core language skills for the IB Diploma Programme, focusing on reading, listening, writing, speaking, and interactive communication. Over two semesters, students engage with diverse texts to build a foundation for IBDP studies, covering all five IB Language B themes. Assessments test writing, reading, and listening skills.'
        },
        {
          title: 'Chinese',
          content: 'Pre-IB Chinese lays the foundation for IBDP studies. Students will explore diverse literary and non-literary texts, learning to analyze details, apply textual conventions, and develop critical interpretations. They will evaluate arguments, distinguish key ideas from supporting details, and infer deeper meanings. Through oral and written forms, students will present insights with structured explanations and evidence.'
        },
        {
          title: 'Math',
          content: 'The Pre-IB Mathematics course prepares students for IBDP Mathematics (Applications and Interpretation, Analysis and Approaches) by building knowledge, skills, and study habits. Through inquiry-based learning, students rediscover concepts and deepen their understanding. They use technology to explore its connection with math, express ideas orally and in writing, apply math in real-world contexts, and interpret results for comprehensive comprehension.'
        },
        {
          title: 'Drama',
          content: 'The Pre-IB Drama course builds a foundation for holistic education while inspiring students\' passion and curiosity for theatre. Students learn core elements of drama through integrated theory and practice, developing collaboration, expression, and intercultural understanding.'
        },
      ],
      electiveSubjects: [
        {
          title: 'Individuals and Societies',
          wrapperClass: "grid-cols-3 gap-x-32",
          articles: [
            {
              title: "Business Management",
              content: "Pre-IB Business Management explores how modern businesses operate, developing key skills in strategy, marketing, finance, and ethics. Through case studies and projects, students apply theoretical knowledge to real-world situations, strengthening critical thinking and collaborative abilities essential for success in IBDP Business Management."
            },
            {
              title: "Economics",
              content: "This Pre-IB Economics course introduces fundamental theories and concepts while fostering global awareness and critical thinking. Through discussions and real-world applications, students gain insight into the economic forces that shape our society, building a strong foundation for the IBDP program."
            },
            {
              title: "Psychology",
              content: "Pre-IB Psychology introduces core concepts and builds a foundation for the IBDP program. Students explore fundamental patterns of human behavior while developing critical thinking and cross-cultural perspectives. Through interactive activities, the course cultivates academic expression and psychological literacy, preparing students for advanced study in IBDP Psychology."
            },
          ],
          cardClass: 'w-80 max-[576px]:w-full'
        },
        {
          title: 'Sciences',
          wrapperClass: "grid-cols-4 gap-x-12",
          articles: [
            {
              title: "Biology",
              content: "Pre-IB Biology builds a foundation for IBDP through hands-on experiments, covering topics from cells to human physiology. Students develop scientific skills and a comprehensive understanding of life sciences, preparing for advanced study and future STEM careers."
            },
            {
              title: "Chemistry",
              content: "Pre-IB Chemistry introduces core concepts, practical skills, and the ability to evaluate scientific developments. It provides an ideal foundation for further chemistry studies and is accessible to students at different starting levels."
            },
            {
              title: "Physics",
              content: "Pre-IB Physics is a one-year foundation course that prepares students for IBDP Physics. It develops scientific knowledge, experimental skills, and critical thinking, enabling students to analyze problems, communicate effectively, and understand science's role in society."
            },
            {
              title: "Computer Science",
              content: "This Pre-IB Computer Science course introduces fundamental concepts and skills in the field. Suitable for beginners and those with prior experience, it develops logical thinking and core programming abilities tailored to different learning levels. The course aims to spark early interest in computer science and build a solid foundation for advanced study."
            },
          ],
          cardClass: 'flex-1'
        },
        {
          title: 'The arts',
          wrapperClass: "grid-cols-1 pl-32 pr-32",
          articles: [
            {
              title: "Visual Arts",
              content: "The Pre-IB Visual Arts year serves as a crucial preparatory stage that nurtures artistic passion while building a solid foundation for advanced IBDP studies. Throughout the year, students deepen their understanding of fundamental artistic principles—including balance, contrast, and unity—while refining technical skills and developing personal expression. The course encourages creative exploration across diverse media and materials, blending practical projects with theoretical discussion to strengthen artistic comprehension. Through this comprehensive training, students acquire the essential skills and knowledge needed to succeed in the challenges of the IBDP Visual Arts curriculum."
            },
          ],
          cardClass: 'flex-1'
        },
      ]
    })

    const previous = () => {
      if (state.currentIndex == 0) {
        return
      }
      state.currentIndex--;
    }
    const next = () => {

      if (state.compulsorySubjects.length - 4 == state.currentIndex) {
        return
      }
      state.currentIndex++;
    }
    return {
      previous,
      next,
      ...toRefs(state)
    }
  }
})
</script>
<style scoped lang="scss">
.extend-course {
  height: 896px;
}

.extend-math {
  height: 856px;
}

@media screen and (max-width: 576px) {
  .extend-course {
    height: fit-content;
  }

  .extend-math {
    height: fit-content;
  }
}

.text-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
</style>