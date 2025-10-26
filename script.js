document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskTitle = document.getElementById('taskTitle');
    const taskDescription = document.getElementById('taskDescription');
    const addBtn = document.getElementById('addBtn');
    const tasksList = document.getElementById('tasksList');

    // Функция для добавления новой задачи
    function addNewTask() {
        const title = taskTitle.value.trim();
        const description = taskDescription.value.trim();

        // Проверка, что название задачи не пустое
        if (title === '') {
            alert('Пожалуйста, введите название задачи');
            taskTitle.focus();
            return;
        }

        // Создание карточки задачи
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.innerHTML = `
            <div class="task-title">${escapeHtml(title)}</div>
            ${description ? `<div class="task-description">${escapeHtml(description)}</div>` : ''}
            <button class="delete-btn">Удалить</button>
        `;

        // Добавление карточки в список
        tasksList.appendChild(taskCard);

        // Очистка формы
        taskForm.reset();
        taskTitle.focus();

        // Обновление сообщения о пустом списке
        updateEmptyMessage();
    }

    // Функция для экранирования HTML (безопасность)
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Функция для обновления сообщения о пустом списке
    function updateEmptyMessage() {
        const existingEmptyMessage = tasksList.querySelector('.empty-message');
        const taskCards = tasksList.querySelectorAll('.task-card');

        if (taskCards.length === 0) {
            if (!existingEmptyMessage) {
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'empty-message';
                emptyMessage.textContent = 'Задачи отсутствуют. Добавьте первую задачу!';
                tasksList.appendChild(emptyMessage);
            }
        } else {
            if (existingEmptyMessage) {
                existingEmptyMessage.remove();
            }
        }
    }

    // Функция для удаления задачи
    function deleteTask(event) {
        if (event.target.classList.contains('delete-btn')) {
            const taskCard = event.target.closest('.task-card');
            if (taskCard) {
                taskCard.remove();
                updateEmptyMessage();
            }
        }
    }

    // Обработчики событий
    addBtn.addEventListener('click', addNewTask);

    // Обработчик для формы (предотвращение отправки)
    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addNewTask();
    });

    // Обработчик для удаления задач (делегирование событий)
    tasksList.addEventListener('click', deleteTask);

    // Обработчик Enter в поле названия
    taskTitle.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addNewTask();
        }
    });

    // Инициализация сообщения о пустом списке
    updateEmptyMessage();
});
// Добавляем эффект частиц на фон
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (3 + Math.random() * 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Запускаем частицы при загрузке
createParticles();

// Добавляем анимацию при добавлении задачи
function animateTaskAddition(taskCard) {
    taskCard.style.animation = 'taskAppear 0.5s ease-out';
}

// Обновляем функцию добавления задачи
function addNewTask() {
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (title === '') {
        // Анимация shake для пустого поля
        taskTitle.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            taskTitle.style.animation = '';
        }, 500);
        alert('Пожалуйста, введите название задачи');
        taskTitle.focus();
        return;
    }

    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.innerHTML = `
        <div class="task-title">${escapeHtml(title)}</div>
        ${description ? `<div class="task-description">${escapeHtml(description)}</div>` : ''}
        <button class="delete-btn">Удалить</button>
    `;

    tasksList.appendChild(taskCard);
    animateTaskAddition(taskCard);

    // Очистка формы с анимацией
    taskForm.style.opacity = '0.7';
    taskForm.style.transform = 'scale(0.98)';
    setTimeout(() => {
        taskForm.reset();
        taskForm.style.opacity = '1';
        taskForm.style.transform = 'scale(1)';
    }, 300);

    taskTitle.focus();
    updateEmptyMessage();
}

// Добавляем анимацию shake в CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);