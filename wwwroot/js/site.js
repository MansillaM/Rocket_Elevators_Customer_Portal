// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var Url = "https://localhost:8888"

$(document).ready(function() {

    hideAll();
    onLoad();

    function hideAll() {
        $("#intervention_battery_id").hide();
        $("#intervention_column_id").hide();
        $("#intervention_elevator_id").hide();
    }

    function onLoad() {
        let email2Id = $("#customer_email").val();
        customerIdFromEmail(email2Id)
    }
    
})

$("#intervention_building_id").change(function () {

    let selectedBuildingId = $(this).val();
    batteryIdFromBuilding(selectedBuildingId)
})

$("#intervention_battery_id").change(function () {

    let selectedBatteryId = $(this).val();
    columnIdForElevator(selectedBatteryId)
    
})

$("#intervention_column_id").change(function () {

    let selectedColumnId = $(this).val();
    elevatorIdEnd(selectedColumnId)
})

$("#submit").click(function () {
    submitForm();
})

function customerIdFromEmail(Email){
    $.ajax({
        url: Url + "/api/customers/" + Email ,
        header: {
            "accept": "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Headers" : "*",
            "Access-Control-Allow-Methods" : "*"
        },
        type: "get",
        crossDomain: true,
        data: {
            email: Email
        },
        dataType: "json",
        success: function (customer) {
            let customerEmail = $("#intervention_customer_id")
            customerEmail.empty()
            customerEmail.show()
            $.each(customer, function() {
                customerEmail.append("<option value=" + customer[0].id + ">" + customer[0].id + "</option>")
            })
            buildingIdFromCustomer(customer[0].id);
        },
        error : function(jqXHR, textStatus, errorThrown){
          }
        
    })
}

function buildingIdFromCustomer(customerId){
    $.ajax({
        url: Url +"/api/buildings/"+ customerId,
        type: "get",
        data: {
            customer_id: customerId
        },
        dataType: "json",
        success: function (building) {
            let buildingCustomer = $("#intervention_building_id")
            buildingCustomer.empty()
            buildingCustomer.show()
            buildingCustomer.append("<option value=" + building[0].id + ">" + building[0].id + "</option>")
            buildingCustomer.append("<option value=" + building[1].id + ">" + building[1].id + "</option>")
            buildingCustomer.append("<option value=" + 0 + "> None </option>")
        }
    })
}

function batteryIdFromBuilding(buildingId) {
    $.ajax({
        url: Url +"/api/battery/" + buildingId,
        type: "get",
        data: {
            building_id: buildingId
        },
        dataType: "json",
        success: function (batterie) {
            let battery_select = $("#intervention_battery_id")
            battery_select.empty()
            battery_select.show()
            battery_select.append("<option value=" + batterie[0].id + ">"+batterie[0].id + "</option>")
            battery_select.append("<option value=" + batterie[1].id + ">"+batterie[1].id + "</option>")
            battery_select.append("<option value=" + batterie[2].id + ">"+batterie[2].id + "</option>")
            battery_select.append("<option value=" + '0' + ">" + 'None' + "</option>")
        },
        error: function (data) {
            alert("Error!")
        }
    })
}

function columnIdForElevator(batteryId) {
    $.ajax({
        url: Url + "/api/Columns/" + batteryId,
        type: "get",
        data: {
            battery_id: batteryId
        },
        dataType: "json",
        success: function (column) {
            let column_select = $("#intervention_column_id")
            column_select.empty()
            column_select.show()
            column_select.append("<option value=" + column[0].id + ">"+column[0].id + "</option>")
            column_select.append("<option value=" + column[1].id + ">"+column[1].id + "</option>")
            column_select.append("<option value=" + '0' + ">" + 'None' + "</option>")
        },
        error: function (data) {
            alert("Error!")
        }
    })
}

function elevatorIdEnd(columnId) {
    $.ajax({
        url: Url + "/api/Elevators/" + columnId,
        type: "get",
        data: {
            column_id: columnId
        },
        dataType: "json",
        success: function (elevator) {
            let elevator_select = $("#intervention_elevator_id")
            elevator_select.empty()
            elevator_select.show()
            elevator_select.append("<option value=" + elevator[0].id + ">" +elevator[0].id + "</option>")
            elevator_select.append("<option value=" + elevator[1].id + ">" +elevator[1].id + "</option>")
            elevator_select.append("<option value=" + '0' + ">" + 'None' + "</option>")
        },
        error: function (data) {
            alert("Error!")
        }
    })
}

function submitForm() {

    let mainAuthorID = $("#intervention_customer_id").val();
    let mainCustomerID = $("#intervention_customer_id").val();
    let mainBuildingID = $("#intervention_building_id").val();
    let mainBatteryID = $("#intervention_battery_id").val();
    let mainColumnID = $("#intervention_column_id").val();
    let mainElevatorID = $("#intervention_elevator_id").val();
    let mainReport = $("#intervention_report").val();
    


    $.ajax({
        url: Url +"/api/interventions/" + mainAuthorID + "/" + mainCustomerID + "/" + mainBuildingID + "/" + mainBatteryID + "/" + mainColumnID + "/" + mainElevatorID + "/" + mainReport,
        type: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        data: {
            author_id: mainAuthorID,
            customer_id: mainCustomerID,
            building_id: mainBuildingID,
            battery_id: mainBatteryID,
            column_id: mainColumnID,
            elevator_id: mainElevatorID,
            report: mainReport
        },
        dataType: "json",
        success: function (result) {
            alert('Successfully received Data ');
            console.log(result);
        },
        error: function () {
            alert('Failed to receive the Data');
            console.log('Failed ');
        }
    })
}