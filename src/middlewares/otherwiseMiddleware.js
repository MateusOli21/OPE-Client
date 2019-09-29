export const otherwiseMiddlware = (to, from, next) => {
    if (localStorage.getItem('userData')) return next('/escolhe-grupo')
    next('/')
}