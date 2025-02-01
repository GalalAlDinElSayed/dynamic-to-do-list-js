// التأكد من تحميل الصفحة بالكامل قبل تنفيذ الكود
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn'); // زر الإضافة
    const taskInput = document.getElementById('task-input'); // حقل إدخال المهمة
    const taskList = document.getElementById('task-list'); // قائمة المهام

    // دالة لإضافة مهمة جديدة
    function addTask() {
        const taskText = taskInput.value.trim(); // قراءة النص المدخل وإزالة الفراغات الزائدة

        if (taskText === '') {
            alert('Please enter a task!'); // تنبيه المستخدم إذا كان الحقل فارغًا
            return;
        }

        // إنشاء عنصر قائمة جديد
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // إنشاء زر إزالة المهمة
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // عند الضغط على زر الإزالة، يتم حذف العنصر من القائمة
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
        };

        listItem.appendChild(removeButton); // إضافة زر الحذف داخل عنصر القائمة
        taskList.appendChild(listItem); // إضافة العنصر إلى القائمة

        taskInput.value = ''; // مسح حقل الإدخال بعد الإضافة
    }

    // تنفيذ إضافة المهمة عند الضغط على زر "إضافة"
    addButton.addEventListener('click', addTask);

    // تنفيذ إضافة المهمة عند الضغط على مفتاح "Enter"
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
