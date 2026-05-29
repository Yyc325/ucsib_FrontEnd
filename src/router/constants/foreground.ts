const FOREGROUND_LAYOUT = () => import("@/views/foreground/foreground.vue");
// 首页
const HOME_PAGE = () => import("@/views/foreground/home/home.vue");

// 学生
const STUDENTS_PAGE = () => import("@/views/foreground/students/students.vue");
// 校友
// 新闻
const NEWS_PAGE = () => import("@/views/foreground/news/news.vue");
// 关于
const ABOUT_PAGE = () => import("@/views/foreground/about/about.vue");
// 学术研究
const ACADEMIC_PAGE = () => import("@/views/foreground/academics/academics.vue")
// 入学
const ADMISSION_PAGE = () => import("@/views/foreground/admission/admission.vue")
// 文章展示页面
const ARTICLE_PAGE = () => import("@/views/foreground/articleDisplay/articleDisplay.vue")
// 校园生活
const CAMPUS_PAGE = () => import("@/views/foreground/campusLife/campusLife.vue")
// 社区
const COMMUNITY_PAGE = () => import("@/views/foreground/community/community.vue")
// 校园生活
const ALUMNI_PAGE = () => import("@/views/foreground/alumni/alumni.vue")
// 校园生活
// const FACULTY_STAFF_PAGE = ()=> import("@/views/foreground/facultyStaff/facultyStaff.vue")
const IBDP_PAGE = () => import("@/views/foreground/academics/Courses/ExploreIBDPCourse/ExploreIBDPCourse.vue")

// 搜索页
const SEARCH_PAGE = () => import('@/views/foreground/search/search.vue')
// 课程详情页
const COURSES_PAGE = ()=> import('@/views/foreground/academics/Courses/Courses.vue')
export default {
    FOREGROUND_LAYOUT,
    HOME_PAGE,
    STUDENTS_PAGE,
    NEWS_PAGE,
    ABOUT_PAGE,
    ACADEMIC_PAGE,
    ADMISSION_PAGE,
    ARTICLE_PAGE,
    CAMPUS_PAGE,
    COMMUNITY_PAGE,
    ALUMNI_PAGE,
    IBDP_PAGE,
    SEARCH_PAGE,
    COURSES_PAGE
    // FACULTY_STAFF_PAGE
};
