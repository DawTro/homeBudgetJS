document.addEventListener("DOMContentLoaded", () => {
  const inputIncome = document.querySelector("#inputincome");
  const inputValue = document.querySelector("#inputvalue");
  const ul = document.querySelector("#listIncome");
  const button = document.querySelector("#addincome");
  const sumOfIncomes = document.querySelector(".sumincom");

  const inputExpense = document.querySelector("#inputexpense");
  const inputExpenseValue = document.querySelector("#inputexpensevalue");
  const expenseAddButton = document.querySelector("#addexpense");
  const expensesList = document.querySelector("#expensesList");
  const sumOfExpenses = document.querySelector(".sumexpenses");
  const infoAboutDifference = document.querySelector(".info");

  const uniqueId = () => {
    return Math.random().toString();
  };

  let incomes = [];
  let expenses = [];

  const renderIncomes = () => {
    ul.innerHTML = "";

    incomes.forEach((income) => {
      const li = document.createElement("li");
      li.setAttribute("class", "li list-group-item list-group-item-success");
      li.dataset.id = income.id;
      li.name = income.name;
      li.value = income.value;

      const content = document.createElement("div");
      content.classList.add("content");

      const textLi = document.createElement("div");
      textLi.classList.add("textLi");
      textLi.innerHTML = `${income.name} ${income.value} PLN`;

      const divButton = document.createElement("div");
      divButton.classList.add("functionalButton");

      const editButton = document.createElement("button");
      editButton.setAttribute("class", "editButton btn btn-outline-dark");
      editButton.textContent = "Edytuj";
      divButton.appendChild(editButton);
      editButton.addEventListener("click", (e) => editIncome(income.id));

      const eraseButton = document.createElement("button");
      eraseButton.setAttribute(
        "class",
        "eraseButton btn btn-outline-secondary"
      );
      eraseButton.textContent = "Usuń";
      divButton.appendChild(eraseButton);
      eraseButton.addEventListener("click", (e) => removeIncome(income.id));

      content.appendChild(textLi);
      content.appendChild(divButton);
      li.appendChild(content);
      ul.appendChild(li);
    });
  };

  const renderExpenses = () => {
    expensesList.innerHTML = "";

    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.setAttribute(
        "class",
        "li-expense list-group-item list-group-item-danger"
      );
      li.dataset.id = expense.id;
      li.name = expense.name;
      li.value = expense.value;

      const contentExpense = document.createElement("div");
      contentExpense.classList.add("contentExpense");

      const textExpense = document.createElement("div");
      textExpense.classList.add("textExpense");
      textExpense.innerHTML = `${expense.name} ${expense.value} PLN`;

      const buttons = document.createElement("div");
      buttons.classList.add("expenseButtons");

      const editExpense = document.createElement("button");
      editExpense.setAttribute("class", "editExpense btn btn-outline-dark");
      editExpense.textContent = "Edytuj";
      buttons.appendChild(editExpense);
      editExpense.addEventListener("click", (e) => edit(expense.id));

      const eraseExpense = document.createElement("button");
      eraseExpense.setAttribute(
        "class",
        "eraseExpense btn btn btn-outline-secondary"
      );
      eraseExpense.textContent = "Usuń";
      buttons.appendChild(eraseExpense);
      eraseExpense.addEventListener("click", (e) => removeExpense(expense.id));

      contentExpense.appendChild(textExpense);
      contentExpense.appendChild(buttons);
      li.appendChild(contentExpense);
      expensesList.appendChild(li);
    });
  };

  const addIncome = () => {
    const inputIncomeValue = inputIncome.value;
    const inputValueValue = inputValue.value;
    const id = uniqueId();

    if (!inputIncomeValue || !inputValueValue) {
      return;
    }

    incomes.push({
      id: id,
      name: inputIncomeValue,
      value: Number(inputValueValue),
    });

    inputIncome.value = "";
    inputValue.value = "";

    console.log(incomes);
    renderIncomes();
    sumIncomes();
    difference();
  };

  const addExpense = () => {
    const expenseName = inputExpense.value;
    const expenseValue = inputExpenseValue.value;
    const idExpense = uniqueId();

    if (!expenseName || !expenseValue) {
      return;
    }

    expenses.push({
      id: idExpense,
      name: expenseName,
      value: Number(expenseValue),
    });

    inputExpense.value = "";
    inputExpenseValue.value = "";

    renderExpenses();
    expensesSum();
    difference();
  };

  const removeIncome = (id) => {
    incomes = incomes.filter((income) => income.id !== id);

    renderIncomes();
    sumIncomes();
    difference();
  };

  const removeExpense = (id) => {
    expenses = expenses.filter((expense) => expense.id !== id);

    console.log(expenses);

    renderExpenses();
    expensesSum();
    difference();
  };

  const editIncome = (id) => {
    console.log("editIncome: ", id);

    const li = document.querySelector(`#listIncome li[data-id="${id}"]`);
    const income = incomes.find((income) => income.id === id);

    li.innerHTML = "";

    const editDiv = document.createElement("div");
    editDiv.classList.add("edit-Div");
    li.appendChild(editDiv);

    // console.log(li.name);

    const editInputIncome = document.createElement("input");
    editInputIncome.setAttribute(
      "class",
      "editInputIncome form-control shadow-none"
    );
    editInputIncome.type = "text";
    console.log(li.name);
    editInputIncome.value = li.name;
    editDiv.appendChild(editInputIncome);

    const editInputValue = document.createElement("input");
    editInputValue.setAttribute(
      "class",
      "editInputValue form-control shadow-none"
    );
    editInputValue.type = "number";
    editInputValue.value = li.value;
    editDiv.appendChild(editInputValue);

    const addEditData = document.createElement("button");
    addEditData.setAttribute("class", "addEditData btn btn-outline-dark");
    addEditData.textContent = "Zmień";
    editDiv.appendChild(addEditData);

    addEditData.addEventListener("click", (e) => changeValues(income));

    const changeValues = (income) => {
      // console.log(li.name)

      income.name = editInputIncome.value;
      li.name = editInputIncome.value;
      income.value = Number(editInputValue.value);
      li.value = Number(editInputValue.value);
      li.innerHTML = "";

      const content = document.createElement("div");
      content.classList.add("content");

      const textLi = document.createElement("div");
      textLi.classList.add("textLi");
      textLi.innerHTML = `${income.name} ${income.value} PLN`;

      const divButton = document.createElement("div");
      divButton.classList.add("functionalButton");

      const editButton = document.createElement("button");
      editButton.setAttribute("class", "editButton btn btn-outline-dark");
      editButton.textContent = "Edytuj";
      divButton.appendChild(editButton);
      editButton.addEventListener("click", (e) => editIncome(income.id));

      const eraseButton = document.createElement("button");
      eraseButton.setAttribute(
        "class",
        "eraseButton btn btn-outline-secondary"
      );
      eraseButton.textContent = "Usuń";
      divButton.appendChild(eraseButton);
      eraseButton.addEventListener("click", (e) => removeIncome(income.id));

      content.appendChild(textLi);
      content.appendChild(divButton);
      li.appendChild(content);

      sumIncomes();
      difference();
    };
  };

  const edit = (id) => {
    console.log("edit", id);

    const li = document.querySelector(`#expensesList li[data-id="${id}"]`);
    const expense = expenses.find((expense) => expense.id === id);

    li.innerHTML = "";

    const editDivExpense = document.createElement("div");
    editDivExpense.classList.add("editDivExpense");
    li.appendChild(editDivExpense);

    const editInputExpense = document.createElement("input");
    editInputExpense.setAttribute(
      "class",
      "editInputExpense form-control shadow-none"
    );
    editInputExpense.type = "text";
    editInputExpense.value = li.name;
    editDivExpense.appendChild(editInputExpense);

    const editExpenseValue = document.createElement("input");
    editExpenseValue.setAttribute(
      "class",
      "editExpenseValue form-control shadow-none"
    );
    editExpenseValue.type = "number";
    editExpenseValue.value = li.value;
    editDivExpense.appendChild(editExpenseValue);

    const confirmButton = document.createElement("button");
    confirmButton.setAttribute("class", "confirmButton btn btn-outline-dark");
    confirmButton.textContent = "Zmień";
    editDivExpense.appendChild(confirmButton);

    confirmButton.addEventListener("click", (e) => changeExpense(expense));

    const changeExpense = (expense) => {
      li.name = editInputExpense.value;
      expense.name = editInputExpense.value;
      li.value = Number(editExpenseValue.value);
      expense.value = Number(editExpenseValue.value);
      li.innerHTML = "";

      const contentExpense = document.createElement("div");
      contentExpense.classList.add("contentExpense");

      const textExpense = document.createElement("div");
      textExpense.classList.add("textExpense");
      textExpense.innerHTML = `${expense.name} ${expense.value} PLN`;

      const buttons = document.createElement("div");
      buttons.classList.add("expenseButtons");

      const editExpense = document.createElement("button");
      editExpense.setAttribute("class", "editExpense btn btn-outline-dark");
      editExpense.textContent = "Edytuj";
      buttons.appendChild(editExpense);
      editExpense.addEventListener("click", (e) => edit(expense.id));

      const eraseExpense = document.createElement("button");
      eraseExpense.setAttribute(
        "class",
        "eraseExpense btn btn btn-outline-secondary"
      );
      eraseExpense.textContent = "Usuń";
      buttons.appendChild(eraseExpense);
      eraseExpense.addEventListener("click", (e) => removeExpense(expense.id));

      contentExpense.appendChild(textExpense);
      contentExpense.appendChild(buttons);
      li.appendChild(contentExpense);
      expensesList.appendChild(li);

      expensesSum();
      difference();
    };
  };

  const difference = () => {
    const incomesSum = incomes.reduce((acc, income) => acc + income.value, 0);
    const sumExpenses = expenses.reduce(
      (acc, expense) => acc + expense.value,
      0
    );
    const infoAboutDiff = incomesSum - sumExpenses;
    const finalValue =
      infoAboutDiff > 0
        ? `Możesz jeszcze wydać ${infoAboutDiff} PLN.`
        : infoAboutDiff < 0
        ? `Bilans jest ujemny. Jesteś na minusie ${infoAboutDiff} PLN.`
        : `Bilans wynosi zero.`;

    // const finalInfo = document.createElement("div");
    // finalInfo.classList.add("finalInfo");
    infoAboutDifference.innerHTML = "";
    const tagFinalInfo = document.createElement("h2");
    tagFinalInfo.setAttribute(
      "class",
      `${
        infoAboutDiff > 0
          ? "list-group-item list-group-item-success"
          : infoAboutDiff < 0
          ? "list-group-item list-group-item-danger"
          : "list-group-item list-group-item-warning"
      }`
    );
    const node = document.createTextNode(`${finalValue}`);
    tagFinalInfo.appendChild(node);
    infoAboutDifference.appendChild(tagFinalInfo);
  };

  const sumIncomes = () => {
    const incomesSum = incomes.reduce((acc, income) => acc + income.value, 0);
    sumOfIncomes.innerHTML = `Suma przychodów: ${incomesSum} PLN`;
  };

  const expensesSum = () => {
    const expensesSum = expenses.reduce(
      (acc, expense) => acc + expense.value,
      0
    );
    sumOfExpenses.innerHTML = `Suma wydatków: ${expensesSum} PLN`;
  };

  button.addEventListener("click", addIncome);
  renderIncomes();
  sumIncomes();

  expenseAddButton.addEventListener("click", addExpense);
  renderExpenses();
  expensesSum();
});
