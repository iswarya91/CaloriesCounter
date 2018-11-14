function Calorie() {
    let totalCalorie = 0;
    const storage = Storage();
    let mealArr = storage.getDateFromStorage();
    computeTotalCalorie();

    function computeTotalCalorie() {
        totalCalorie = 0;
        mealArr.forEach(function (item) {
            totalCalorie += item.calorie;
        })
    }

    function addCalorie(calorie) {
        totalCalorie += calorie;
    }

    return {

        getTotalCalorie: function () {
            return totalCalorie;
        },

        addMeal: function (meal, calorie) {
            mealArr.push({
                mealId: mealArr.length + 1,
                meal: meal,
                calorie: calorie
            });
            addCalorie(calorie);
            storage.setDataToStorage(mealArr);
        },

        deleteMeal: function (mealId) {
            // mealId is index + 1
            const index = mealId - 1;
            mealArr.splice(index, 1);
            computeTotalCalorie();
            storage.setDataToStorage(mealArr);

        },
        getMeal:function(mealId) {
            return mealArr[mealId - 1];
        },
        updateMeal: function (mealId, meal, calorie) {
            item = mealArr[mealId - 1];
            item.meal = meal;
            item.calorie = calorie;
            computeTotalCalorie();
            storage.setDataToStorage(mealArr);
        },
        getMealList: function () {
            return mealArr;
        },
        clearMealList: function() {
            storage.clearDataFromStorage();
            window.location.reload();
        }
    }
}