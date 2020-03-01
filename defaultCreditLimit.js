/**
 * @NApiVersion 2.0
 * @NScriptType CLientScript
 */

define(['N/error'], function(error) {

    /**
     * Maximum credit limit amount available
     */
    var creditLimit = 1000;

    /**
     * Function that throws error if field value 
     * is higher tham maximum credit value
     * 
     * @param {integer} enteredValue Currently entered value of credit limit
     */
    function checkValue(enteredValue) {
        if (enteredValue > creditLimit) {
            throw error.create({
                name: 'CRE_LIM_TOO_HIGH',
                message: 'Credit limit value can not exceed 1000'
            });
        }
        return true;
    }

    /**
     * Fired when form loads for editing.
     * We pre-set the credit limit field value initially here.
     * 
     * @param {object} context 
     */
    function pageInit(context) {
        if (context.mode !== 'create') {
            return;
        }
        var currentRecord = context.currentRecord;
        currentRecord.setValue({
            fieldId: 'creditlimit',
            value: creditLimit
        });
    }

    /**
     * Fired when a field is about to be changed by a user or client side call.
     * We could potentially use fieldChanged() instead, testing required.
     *
     * @param {object} context 
     */
    function validateField(context) {
        var currentRecord = context.currentRecord;
        var creditLimitValue = currentRecord.getValue({ 
            fieldId: 'creditlimit'
        });

        // For the purpose of this task, we'll parse
        // entered value to integer
        var creditLimitValueInt = parseInt(creditLimitValue);
        
        checkValue(creditLimitValueInt);
        return true;
    }

    /**
     * Fired on record being saved.
     * 
     * Needs testing to check whether form can save all other fields without
     * specifying them in a script.
     * 
     * @param {object} context 
     */
    function saveRecord(context) {
        var currentRecord = context.currentRecord;
        var creditLimitValue = currentRecord.getValue({
            fieldId: 'creditlimit'
        });

        // For the purpose of this task, we'll parse
        // entered value to integer
        var creditLimitValueInt = parseInt(creditLimitValue);

        checkValue(creditLimitValueInt);
        return true;
    }

    return {
        pageInit: pageInit,
        validateField: validateField,
        saveRecord: saveRecord
    };
});