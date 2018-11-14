function UI(calorieObj) {
    const totalCalDisp = document.querySelector('#totCalDisp');
    const mealTableDisp = document.querySelector('.calorie_disp')
    const formstate = new FormState();

    function updateTotalCalorie(totCal) {
        totalCalDisp.textContent = totCal
    }

    function displayMealTable() {
        const mealList = calorieObj.getMealList();
        if (mealList.length > 0) {
            let output = `<table><thead><tr>
                                <th>Index</th>
                                <th>Food Item</th>
                                <th>Calorie</th>
                                <th></th>
                            </tr></thead><tbody>`;

            mealList.forEach(function (item) {
                output += `<tr id="row_${item.mealId}"><td>${item.mealId}</td>
                           <td>${item.meal}</td>
                           <td>${item.calorie}</td>
                           <td><i class="material-icons edit">edit</i></td>
                            </tr>`;
            })

            output += `</tbody>
          </table>`
          mealTableDisp.innerHTML = output;
        } else {
            mealTableDisp.innerHTML = '';
        }
        
    }

    return {

        updateUI: function () {
            updateTotalCalorie(calorieObj.getTotalCalorie());
            displayMealTable();
        },

        displayError: function(){

        },

        init: function() {
            formstate.init();
            updateTotalCalorie(calorieObj.getTotalCalorie());
            displayMealTable();
        },

        changeFormState: function(state, item) {
            if(state === 'add') {
                formstate.changeState(new AddState)
            } else if (state === 'edit') {
                formstate.changeState(new EditState(item));
            }
           
        }
    }
}

function FormState() {
    this.currState;
    
    this.changeState = function(newState) {
        this.currState = newState;
    }

    this.init = function() {
        this.currState = new AddState();
    }

}

function AddState() {
    document.querySelector('.card-content').innerHTML = `
    <span class="card-title">Add Meal/Food Item</span>
    <form id="meal-form">
        <div class="row">
            <div class="input-field col m6">
                <input placeholder="Add Item" id="meal" type="text" class="validate">
                <label for="meal" class="active">Meal</label>
            </div>
            <div class="input-field col m6">
                <input id="calorie" placeholder="Add Calorie" type="number" class="validate">
                <label for="calorie" class="active">Calorie</label>
            </div>
        </div>
        <button class="btn waves-effect waves-light blue darken-3" type="submit" id="add">
            <i class="material-icons left">add</i>Add Meal
        </button>
    </form>
    `;
}

function EditState(item) {
    document.querySelector('.card-content').innerHTML = `
    <span class="card-title">Edit Meal/Food Item</span>
    <form id="meal-form">
        <div class="row">
            <div class="input-field col m6">
                <input placeholder="Add Item" id="meal" type="text" value=${item.meal} class="validate">
                <label for="meal" class="active">Meal</label>
            </div>
            <div class="input-field col m6">
                <input id="calorie" placeholder="Add Calorie" type="number" value=${item.calorie} class="validate">
                <label for="calorie" class="active">Calorie</label>
            </div>
        </div>
        <button class="btn waves-effect waves-light orange darken-3" type="submit" id="update">
            <i class="material-icons left">update</i>Update Meal
        </button>
        <button class="btn waves-effect waves-light red darken-3" type="submit" id="delete">
            <i class="material-icons left">delete</i>Delete Meal
        </button>
        <button class="btn waves-effect waves-light grey darken-3" type="submit" id="back">
            <i class="material-icons left">chevron_left</i>Back
        </button>
    </form>
    `;
}