const calorieObj = Calorie();
const ui = UI(calorieObj);
let editMealId;

ui.init();
// UI Event Listener
document.querySelector('.card-content').addEventListener('click', handleCardClick);
document.querySelector('.calorie_disp').addEventListener('click', editMeal);
document.querySelector('#clear').addEventListener('click', handleClearEvent);

function handleClearEvent(e) {
    calorieObj.clearMealList();
    e.preventDefault();
}

function handleCardClick(e) {
    if (e.target.id === 'add') {
        addNewMeal();
    } else if (e.target.id === 'update') {
        updateMeal(e);
    } else if (e.target.id === 'delete') {
        deleteMeal(e);
    } else if (e.target.id === 'back') {
        backButtonHandler();
    }
    e.preventDefault();
}

function updateMeal() {
    const meal = document.querySelector('#meal');
    const calorie = document.querySelector('#calorie');
    if (meal.value === '' || calorie.value === '') {
        ui.displayError()
    } else {
        calorieObj.updateMeal(editMealId, meal.value, Number(calorie.value));
        ui.updateUI();
        ui.changeFormState('add');
    }
}

function deleteMeal() {
    calorieObj.deleteMeal(editMealId);
    ui.updateUI();
    ui.changeFormState('add');
}

function backButtonHandler() {
    editMealId = NaN;
    ui.changeFormState('add');
}

function addNewMeal() {
    const meal = document.querySelector('#meal');
    const calorie = document.querySelector('#calorie');
    if (meal.value === '' || calorie.value === '') {
        ui.displayError()
    } else {
        calorieObj.addMeal(meal.value, Number(calorie.value));
        ui.updateUI();
        meal.value = '';
        calorie.value = '';
    }
}

function editMeal(e) {
    if (e.target.classList.contains('edit')) {
        const mealRowId = e.target.parentElement.parentElement.id;
        const mealId = mealRowId.split('_')[1];
        ui.changeFormState('edit', calorieObj.getMeal(mealId));
        editMealId = Number(mealId);
    }
    e.preventDefault();
}