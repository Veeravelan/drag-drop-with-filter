
const items = ['Temperature', 'Humidity', 'Temperature Alarm', 'Humidity Alarm', 'Date Time'];

$(document).ready(function () {
    /**
    * Dynamically create ul from the array
     **/
    const dragList = $('ul.drag-ul');
    $.each(items, function (i) {
        const li = $('<li/>')
            .addClass('drag-menu-item')
            .attr('role', 'menuitem')
            .appendTo(dragList);
        const text = $('<a/>')
            .addClass('item-text')
            .text(items[i])
            .appendTo(li);
    });
    /**
    * Drag functionality
     **/
    $("ul.drag-ul .drag-menu-item").draggable({
        helper: 'clone',
        cursor: 'move',
        tolerance: 'fit',
        revert: false
    });
    /**
    * Drop functionality
     **/
    $('.drop-ul').droppable({
        accept: "ul.drag-ul .drag-menu-item",
        drop: function (event, ui) {
            const droppable = $(this);
            const draggable = ui.draggable;
            // Move draggable into droppable
            draggable.clone().appendTo(droppable);
        }
    });

    $(".drop-ul").sortable();
    $(".drop-ul").disableSelection();

    /**
     * Filter search
     **/
    $("#search-items").on("keyup", function () {
        const value = this.value.toLowerCase().trim();
        $("ul.drag-ul li").show().filter(function (index) {
            if (index > 0)
                return $(this).children('a').text().toLowerCase().trim().indexOf(value) == -1;
        }).hide();
    });
});