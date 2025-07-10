/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/error'], function(record, error) {
    
    function doValidation(args, argNames, methodName) {
        for (var i = 0; i < args.length; i++) {
            if (!args[i] && args[i] !== 0) {
                throw error.create({
                    name: 'MISSING_REQ_ARG',
                    message: 'Missing a required argument: ' + argNames[i]
                });
            }
        }
    }

    function createCustomer(context) {
        try {
            doValidation(
                [context.companyname, context.firstname, context.lastname, context.email],
                ['companyname', 'firstname', 'lastname', 'email'],
                'POST'
            );

            var customerRecord = record.create({
                type: record.Type.CUSTOMER,
                isDynamic: true
            });
            customerRecord.setValue({
                fieldId: 'companyname',
                value: context.companyname
            });
            customerRecord.setValue({
                fieldId: 'firstname',
                value: context.firstname
            });
            customerRecord.setValue({
                fieldId: 'lastname',
                value: context.lastname
            });
            customerRecord.setValue({
                fieldId: 'email',
                value: context.email
            });
            customerRecord.setValue({
                fieldId: 'subsidiary',
                value: context.subsidiary || 1 
            });
            customerRecord.setValue({
                fieldId: 'isperson',
                value: 'T' 
            });

            // Set address fields
            if (context.address) {
                customerRecord.selectNewLine({
                    sublistId: 'addressbook'
                });
                customerRecord.setCurrentSublistValue({
                    sublistId: 'addressbook',
                    fieldId: 'defaultbilling',
                    value: true
                });
                customerRecord.setCurrentSublistValue({
                    sublistId: 'addressbook',
                    fieldId: 'defaultshipping',
                    value: true
                });

                // Create address subrecord
                var addressSubrecord = customerRecord.getCurrentSublistSubrecord({
                    sublistId: 'addressbook',
                    fieldId: 'address'
                });

                addressSubrecord.setValue({
                    fieldId: 'addressee',
                    value: context.address.addressee || context.companyname
                });
                addressSubrecord.setValue({
                    fieldId: 'addr1',
                    value: context.address.addr1 || ''
                });
                addressSubrecord.setValue({
                    fieldId: 'city',
                    value: context.address.city || ''
                });
                addressSubrecord.setValue({
                    fieldId: 'state',
                    value: context.address.state || ''
                });
                addressSubrecord.setValue({
                    fieldId: 'zip',
                    value: context.address.zip || ''
                });
                addressSubrecord.setValue({
                    fieldId: 'country',
                    value: context.address.country || '_unitedStates'
                });

                customerRecord.commitLine({
                    sublistId: 'addressbook'
                });
            }

            var customerId = customerRecord.save({
                ignoreMandatoryFields: true 
            });

            return {
                status: 'success',
                customerId: customerId,
                message: 'Customer created successfully'
            };
        } catch (e) {
            return {
                status: 'error',
                message: e.message
            };
        }
    }

    return {
        post: createCustomer
    };
});