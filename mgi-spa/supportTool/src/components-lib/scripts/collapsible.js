$(document).ready(function() {
    $('table.adaptive tr.details-row, .accordion .panel-collapse').on('shown.bs.collapse', function () {
        var $parentRow = $(this).prev();
        $parentRow.prop('aria-expanded', 'true');
        $parentRow.find('[aria-expanded]').attr('aria-expanded', true);
    }).on('hidden.bs.collapse', function () {
        var $parentRow = $(this).prev();
        $parentRow.prop('aria-expanded', 'false');
        $parentRow.find('[aria-expanded]').attr('aria-expanded', false);
    });
});