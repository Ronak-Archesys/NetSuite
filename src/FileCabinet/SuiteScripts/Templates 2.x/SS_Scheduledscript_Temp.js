/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 */
define(['N/log', 'N/record', 'N/search'], function (log, record, search) {

    function execute(context) {
        log.debug('Scheduled Script', 'Execution started');

        // Example logic: search and log sales orders
        var salesOrderSearch = search.create({
            type: search.Type.SALES_ORDER,
            filters: [['status', 'anyof', 'SalesOrd:A']],
            columns: ['internalid', 'tranid']
        });

        salesOrderSearch.run().each(function (result) {
            log.debug('Sales Order Found', {
                id: result.getValue('internalid'),
                tranId: result.getValue('tranid')
            });
            return true;
        });

        log.debug('Scheduled Script', 'Execution complete');
    }

    return {
        execute: execute
    };
});
