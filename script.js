// التأكد من تحميل الصفحة بالكامل قبل تنفيذ الكود
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn'); // زر الإضافة
    const taskInput = document.getElementById('task-input'); // حقل إدخال المهمة
    const taskList = document.getElementById('task-list'); // قائمة المهام

    // تحميل المهام من Local Storage عند تشغيل الصفحة
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // استرجاع المهام أو مصفوفة فارغة
        storedTasks.forEach(taskText => addTask(taskText, false)); // إضافة المهام إلى القائمة
    }

    // دالة لإضافة مهمة جديدة
    function addTask(taskText, save = true) {
        if (!taskText.trim()) {
            alert('Please enter a task!'); // منع إضافة مهام فارغة
            return;
        }

        // إنشاء عنصر قائمة جديد
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // إنشاء زر إزالة المهمة
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // عند الضغط على زر الإزالة، يتم حذف العنصر من القائمة ومن Local Storage
        removeButton.onclick = function () {
            listItem.remove();
            removeTask(taskText);
        };

        listItem.appendChild(removeButton); // إضافة زر الحذف داخل عنصر القائمة
        taskList.appendChild(listItem); // إضافة العنصر إلى القائمة

        // حفظ المهمة في Local Storage إذا لم تكن من عملية استرجاع
        if (save) {
            saveTask(taskText);
        }
    }

    // دالة لحفظ المهام في Local Storage
    function saveTask(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // دالة لحذف مهمة من Local Storage
    function removeTask(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText); // إزالة المهمة
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // تحديث Local Storage
    }

    // تنفيذ إضافة المهمة عند الضغط على زر "إضافة"
    addButton.addEventListener('click', function () {
        addTask(taskInput.value);
        taskInput.value = ''; // مسح حقل الإدخال بعد الإضافة
    });

    // تنفيذ إضافة المهمة عند الضغط على مفتاح "Enter"
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
            taskInput.value = ''; // مسح حقل الإدخال بعد الإضافة
        }
    });

    // تحميل المهام المحفوظة عند فتح الصفحة
    loadTasks();
});
