/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/log', 'N/redirect'], function (serverWidget, log, redirect) {

    function onRequest(context) {
        if (context.request.method === 'GET') {
            handleGet(context);
        } else if (context.request.method === 'POST') {
            handlePost(context);
        }
    }

    function handleGet(context) {
        var form = serverWidget.createForm({
            title: 'My Suitelet Form'
        });

        // Add fields
        form.addField({
            id: 'custpage_sample_field',
            type: serverWidget.FieldType.TEXT,
            label: 'Sample Text Field'
        });

        // Add submit button
        form.addSubmitButton({
            label: 'Submit'
        });

        context.response.writePage(form);
    }

    function handlePost(context) {
        var request = context.request;
        var submittedValue = request.parameters.custpage_sample_field;

        // Do something with the submitted value (log, save, etc.)
        log.debug('Submitted Value', submittedValue);

        // Optionally redirect or show confirmation
        var form = serverWidget.createForm({
            title: 'Form Submitted'
        });

        form.addField({
            id: 'custpage_confirmation',
            type: serverWidget.FieldType.INLINEHTML,
            label: ' '
        }).defaultValue = `<div style="font-weight:bold;">You submitted: ${submittedValue}</div>`;

        context.response.writePage(form);
    }

    return {
        onRequest: onRequest
    };
});
