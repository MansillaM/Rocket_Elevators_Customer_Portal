// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function() {

    hideAll();
    onLoad();

    function hideAll() {
        // $("#intervention_building_id").hide();
        $("#intervention_battery_id").hide();
        $("#intervention_column_id").hide();
        $("#intervention_elevator_id").hide();
    }

    function onLoad() {
        let email2Id = $("#customer_email").val();
        console.log(email2Id)
        customerIdFromEmail(email2Id)
    }
    
})

function customerIdFromEmail(Email){
    console.log(Email)
    $.ajax({
        url: "https://localhost:8888/api/customers/" + Email ,
        header: {
            "accept": "application/json",
            "Access-Control-Allow-Origin" : "*"
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
            // buildingIdFromCustomer();
            console.log('customer', customer)
        },
        error : function(jqXHR, textStatus, errorThrown){
            console.log(textStatus)
          }
        
    })
}

function buildingIdFromCustomer(customerId){
    $.ajax({
        url: "https://localhost:8888/api/buildings",
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
        }
    })
}