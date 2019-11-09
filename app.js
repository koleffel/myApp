// Book Class: Represents a Book
class Number {
    constructor(position, material, date) {
        this.position = position;
        this.material = material;
        this.date = date;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayNumbers() {
        const numbers = Store.getNumbers();

        numbers.forEach((number) => UI.addNumberToList(number));
    }

    static addNumberToList(number) {
        const list = document.querySelector('#number-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${number.position}</td>
        <td>${number.material}</td>
        <td>${number.date}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

        list.appendChild(row);
    }

    static deleteNumber(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#position').value = '';
        document.querySelector('#material').value = '';
        document.querySelector('#date').value = '';
    }
}

// Store Class: Handles Storage
class Store {
    static getNumbers() {
        let numbers;
        if (localStorage.getItem('numbers') === null) {
            books = [];
        } else {
            numbers = JSON.parse(localStorage.getItem('numbers'));
        }

        return materials;
    }

    static addNumber(number) {
        const numbers = Store.getNumbers();
        numbers.push(number);
        localStorage.setItem('numbers', JSON.stringify(numbers));
    }

    static removeBook(date) {
        const numbers = Store.getNumbers();

        numbers.forEach((number, index) => {
            if (number.date === date) {
                numbers.splice(index, 1);
            }
        });

        localStorage.setItem('numbers', JSON.stringify(numbers));
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayNumbers);

// Event: Add a Book
document.querySelector('#number-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const position = document.querySelector('#position').value;
    const material = document.querySelector('#material').value;
    const date = document.querySelector('#date').value;

    // Validate
    if (position === '' || material === '' || date === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // Instatiate book
        const number = new Number(position, material, date);

        // Add Book to UI
        UI.addNumberToList(number);

        // Add book to store
        Store.addNumber(number);

        // Show success message
        UI.showAlert('Material Added', 'succsess');

        // Clear fields
        UI.clearFields();
    }
});

// Event: Remove a Book
document.querySelector('#number-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteNumber(e.target);

    // Remove book from store
    Store.removeNumber(e.target.parentElement.previousElementSibling.textContent);

    // Show success message
    UI.showAlert('Material Removed', 'success');
});