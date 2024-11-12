const averageScore = document.getElementById('avg-score');
const categoryScores = document.querySelectorAll('.score-value');

/**
 * Fetches the data from the JSON file and initializes the data population functions
 */
async function getScoresData() {
    try {
        const res = await fetch('/data.json');
        const categories = await res.json();

        populateScoresData(categories);
        populateAvgScore(getAvgScore(categories));

    } catch (err) {
        console.error(err);
    }
}

/**
 * Populates the individual category scores in the DOM
 * @param { Array } categoriesData - The array of objects containing the categories and their scores
 */
function populateScoresData(categoriesData) {
    if (categoriesData) {
        categoriesData.forEach(category => {
            categoryScores.forEach(score => {
                if (score.dataset.category === category.category.toLowerCase()) {
                    score.textContent = category.score;
                }
            });
        });
    }
    else {
        categoryScores.forEach(score => {
            score.textContent = "0";
        });
    }
}

/**
 * Calculates the average score from the categories array
 * @param { Array } categoriesData - The array of objects containing the categories and their scores
 * @returns { Number } The average score
 */
function getAvgScore(categoriesData) {
    let scoresSum = 0;
    let categoriesAmount = 0;

    if (categoriesData) {
        categoriesData.forEach(category => {
            scoresSum += category.score;
            categoriesAmount++;
        })
    }

    return Math.round(scoresSum / categoriesAmount);
}

/**
 * Populates the average score element in the DOM
 * @param { Number } avgScore 
 */
function populateAvgScore(avgScore) {
    averageScore.textContent = avgScore;
}

getScoresData();