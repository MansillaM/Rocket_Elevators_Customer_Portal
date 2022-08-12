// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function() {

    hideAll();
    onLoad();
    // buildingID();

    function hideAll() {
        // $("#intervention_building_id").hide();
        $("#intervention_battery_id").hide();
        $("#intervention_column_id").hide();
        $("#intervention_elevator_id").hide();
    }

    function onLoad() {
        let email2Id = $("#customer_email").val();
        customerIdFromEmail(email2Id)
    }

    // function buildingID(){
    //     let customer2Building = $("#intervention_customer_id").val();
    //     console.log(customer2Building)
    //     buildingIdFromCustomer(customer2Building)
    // }
    
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
    console.log(selectedColumnId)
    elevatorIdEnd(selectedColumnId)
})

function customerIdFromEmail(Email){
    $.ajax({
        url: "https://localhost:8888/api/customers/" + Email ,
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
        url: "https://localhost:8888/api/buildings/"+ customerId,
        type: "get",
        data: {
            customer_id: customerId
        },
        dataType: "json",
        success: function (building) {
            let buildingCustomer = $("#intervention_building_id")
            buildingCustomer.empty()
            buildingCustomer.show()
            $.each(building, function() {
                buildingCustomer.append("<option value=" + building[0].id + ">" + building[0].id + "</option>")
            })
            buildingCustomer.append("<option value=" + 0 + "> None </option>")
        }
    })
}

function batteryIdFromBuilding(buildingId) {
    $.ajax({
        url: "https://localhost:8888/api/battery/" + buildingId,
        type: "get",
        data: {
            building_id: buildingId
        },
        dataType: "json",
        success: function (batterie) {
            let battery_select = $("#intervention_battery_id")
            battery_select.empty()
            battery_select.show()
            $.each(batterie, function () {
                battery_select.append("<option value=" + batterie[0].id + ">"+batterie[0].id + "</option>")
            })
            battery_select.append("<option value=" + '0' + ">" + 'None' + "</option>")
        },
        error: function (data) {
            alert("Error!")
        }
    })
}

function columnIdForElevator(batteryId) {
    $.ajax({
        url: "https://localhost:8888/api/Columns/" + batteryId,
        type: "get",
        data: {
            battery_id: batteryId
        },
        dataType: "json",
        success: function (column) {
            let column_select = $("#intervention_column_id")
            column_select.empty()
            column_select.show()
            $.each(column, function () {
                column_select.append("<option value=" + column[0].id + ">"+column[0].id + "</option>")
            })
            column_select.append("<option value=" + '0' + ">" + 'None' + "</option>")
        },
        error: function (data) {
            alert("Error!")
        }
    })
}

function elevatorIdEnd(columnId) {
    $.ajax({
        url: "https://localhost:8888/api/Elevators/" + columnId,
        type: "get",
        data: {
            column_id: columnId
        },
        dataType: "json",
        success: function (elevator) {
            let elevator_select = $("#intervention_elevator_id")
            elevator_select.empty()
            elevator_select.show()
            $.each(elevator, function () {
                elevator_select.append("<option value=" + elevator[0].id + ">" +elevator[0].id + "</option>")
            })
            elevator_select.append("<option value=" + '0' + ">" + 'None' + "</option>")
        },
        error: function (data) {
            alert("Error!")
        }
    })
}