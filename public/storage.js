function Storage() {   
    return {
        getDateFromStorage: function() {
            if (localStorage.getItem('mealList') !== null) {
                return JSON.parse(localStorage.getItem('mealList'))
            }
            return [];
        },

        setDataToStorage: function(mealArr) {
            localStorage.setItem('mealList', JSON.stringify(mealArr));
        },

        clearDataFromStorage: function() {
            localStorage.removeItem('mealList');
        }
   }
}