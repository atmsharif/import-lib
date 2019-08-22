// For accessibility, a modal dialog must:
// (a) contain an element with role="document"
// (b) have that element focused after the dialog opens.
// Otherwise, the dialog itself gets focused, and will be treated as having
// role="application" - meaning the screen reader's keyboard controls shut down.
$(document).ready(function() {
    var $modalInvoker;
    $('.modal').on('shown.bs.modal', function (e) {
        $modalInvoker = $(e.relatedTarget)
        var doc = $(this).find('[role=document]');
        doc.first().focus();
    });
    $('.modal').on('hidden.bs.modal', function(e) {
        $modalInvoker.focus();
    })
});