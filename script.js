// Список курсов
let courses = [
    { name: "Courses in England", prices: [0, 100] },
    { name: "Courses in Germany", prices: [500, null] },
    { name: "Courses in Italy", prices: [100, 200] },
    { name: "Courses in Russia", prices: [null, 400] },
    { name: "Courses in China", prices: [50, 250] },
    { name: "Courses in USA", prices: [200, null] },
    { name: "Courses in Kazakhstan", prices: [56, 324] },
    { name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];




//  -------------------------------------------------------------
// Тут можно ввести функцию и в консоли посмотреть, что происходит. Функции описаны ниже. 
let testArray = filterCoursesStrictly(courses, requiredRange1);

testArray.forEach(element => {
    console.log(element);
});


// Я сделал 2 вида фильтра: 
// 1. filterCoursesStrictly - фильтр который строго отсекает варианты, которые не вписываются в диапозон 
// 2. filterCoursesSoft - фильтр который отсекает только те варианты, которые ТОЧНО не вписываются в диапозон. 

// Например, если requiredRange - от 100 до 200, то значение цены от 50 до 150 будет пересекаться с requiredRange от 100 до 150, следовательно функция filterCoursesSoft его включит, а filterCoursesStrictly нет. 
// В связи с этим значение цены у "Courses in France" [null, null], по фильтру filterCoursesSoft будет включено всегда

// PS: Насколько я понял, "Courses in France" [null, null] означает, что цена может быть абсолютно любая. 

function filterCoursesStrictly(courses, range = [null, null]) {
    let array = courses.filter((course) => {
        if(range[0] === null) {
            if(course.prices[1] <= range[1]) {
                if(course.prices[0] < range[1] && course.prices[0] !== null) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else if(range[1] === null) {
            if(course.prices[0] >= range[0]) {
                return true;
            } else {
                return false;
            }
        } else if(course.prices[0] >= range[0] && course.prices[1] <= range[1]) {
            if(course.prices[1] === null) {
                return false;
            }
            return true;
        } 
        return false;
    });

    //Тут соритруем полученное значение
    return sortCourses(array); 
}

function filterCoursesSoft(courses, range = [null, null]) {
    let array = courses.filter((course) => {
        if(range[0] === null) {
            if(course.prices[0] < range[1] || course.prices[0] === null) {
                return true;
            } else {
                return false;
            }
        } else if(range[1] === null) {
            if(course.prices[0] >= range[0] || course.prices[1] > range[0] || course.prices[1] === null) {
                return true;
            } else {
                return false;
            }
        } else if((course.prices[0] <= range[1] || course.prices[0] === null) && (course.prices[1] > range[0] || course.prices[1] === null)) {
            return true;
        }
        return false;
    });

    //Тут соритруем полученное значение
    return sortCourses(array);
};

// сортировка имеет 4 способа сортировки: 
// 1. От меньшего к большему, по минимальному значению диапозона - это будет sortCourses(array, 'asc', 'min'), это и есть сортировка по умолчанию sortCourses(array);
// 2. От меньшего к большему, по максимальному значению диапозона - это будет sortCourses(array, 'asc', 'max')
// 3. От большего к меньшему, по минимальному значению диапозона - это будет sortCourses(array, 'desc', 'min')
// 4. От большего к меньшему, по максимальному значению диапозона - это будет sortCourses(array, 'desc', 'max')

function sortCourses(array, order = 'asc', it = 'min') {
    let count = 0;
    if (it === 'min')
        count = 0;
    else if (it === 'max')
        count = 1;
    else
        return false;

    if (order === 'asc')
        array.sort(function (a, b) {
            if (a.prices[count] === null && b.prices[count] !== null) {
                if(count === 1) {
                    return 1;
                } else if(count === 0) {
                    return 1;
                }
            } else if (b.prices[count] === null && a.prices[count] !== null) {
                if(count === 1) {
                    return -1;
                } else if(count === 0) {
                    return -1;
                }
            } else if(a.prices[count] === null && b.prices[count] === null) {
                if(count === 1) {
                    if (a.prices[0] === null && b.prices[0] !== null) {
                        return 1;
                    } else if (b.prices[0] === null && a.prices[0] !== null) {
                        return -1;
                    }
                    return a.prices[0] - b.prices[0];
                } else if(count === 0) {
                    if (a.prices[1] === null && b.prices[1] !== null) {
                        return 1;
                    } else if (b.prices[1] === null && a.prices[1] !== null) {
                        return -1;
                    }
                    return a.prices[1] - b.prices[1];
                }
            }
            return a.prices[count] - b.prices[count];
        });
    else if (order === 'desc')
        array.sort(function (a, b) {
            if (a.prices[count] === null && b.prices[count] !== null) {
                if(count === 1) {
                    return -1;
                } else if(count === 0) {
                    return 1;
                }
            } else if (b.prices[count] === null && a.prices[count] !== null) {
                if(count === 1) {
                    return 1;
                } else if(count === 0) {
                    return -1;
                }
            } else if(a.prices[count] === null && b.prices[count] === null) {
                if (count === 1) {
                    if (a.prices[0] === null && b.prices[0] !== null) {
                        return -1;
                    } else if (b.prices[0] === null && a.prices[0] !== null) {
                        return 1;
                    }
                    return b.prices[0] - a.prices[0];
                } else if (count === 0) {
                    if (a.prices[1] === null && b.prices[1] !== null) {
                        return -1;
                    } else if (b.prices[1] === null && a.prices[1] !== null) {
                        return 1;
                    }
                    return b.prices[1] - a.prices[1];
                }
            }

            return b.prices[count] - a.prices[count];
        });
    else
        return false;

    return array;
}
