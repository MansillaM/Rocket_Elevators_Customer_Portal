var Url = "https://rocket-elevators-foundation-op.herokuapp.com"

$(document).ready(function() {

    rightNow();

    function rightNow() {
        let getCustId = $("#customer_emaill").val();
        customerEmail(getCustId);
    }

})

//ajax call to get customer id to put in building ajax call
function customerEmail(Email){
    $.ajax({
        url: Url + "/api/customers/" + Email ,
        type: "get",
        data: {
            email: Email
        },
        dataType: "json",
        success: function (customer) {
            getBuildingData(customer[0].id);
        },
        error : function(jqXHR, textStatus, errorThrown){
          }
        
    })
}

//ajax call to populate buildig data
function getBuildingData(customerID) {
    $.ajax({
        url: Url +"/api/buildings/"+ customerID,
        type: "get",
        data: {
            customer_id: customerID
        },
        dataType: "json",
        success: function (building) {
            let buildingGet = $("#buildingData")
                buildingGet.append("<tr>"
                )
                buildingGet.append("<td>" + "BUILDING ID  :  " + building[0].id + "</td>"
                )
                buildingGet.append("<td>" + "  ADDRESS ID  :  " + building[0].address_id + "</td>"
                )
                buildingGet.append("<td>" + "  TECH NAME  :  " + building[0].tech_name + "</td>"
                )
                buildingGet.append("<td>" + "  TECH PHONE  :  " + building[0].tech_phone + "</td>"
                )
                buildingGet.append("</tr>"
                )
                buildingGet.append("<tr>"
                )
                buildingGet.append("<td>" + "BUILDING ID  :  " + building[1].id + "</td>"
                )
                buildingGet.append("<td>" + "  ADDRESS ID  :  "  + building[1].address_id + "</td>"
                )
                buildingGet.append("<td>" + "  TECH NAME  :  "  + building[1].tech_name + "</td>"
                )
                buildingGet.append("<td>" + "  TECH PHONE  :  "  + building[1].tech_phone + "</td>"
                )
                buildingGet.append("</tr>"
                )
                getBatteryData(building[0].id);
                getBatteryData(building[1].id);
        }
    })
}

//ajax call to populate battery data
function getBatteryData(buildingID) {
    $.ajax({
        url: Url +"/api/battery/"+ buildingID,
        type: "get",
        data: {
            building_id: buildingID
        },
        dataType: "json",
        success: function (battery) {
            let batteryGet = $("#batteryData")
                batteryGet.append("<tr>")
                batteryGet.append("<td>" + "BATTERY ID  :  " + battery[0].id + "</td>")
                batteryGet.append("<td>" + "  BUILDING TYPE  :  " + battery[0].building_type + "</td>")
                batteryGet.append("<td>" + "  STATUS  :  " + battery[0].status + "</td>")
                batteryGet.append("<td>" + "  EMPLOYEE ID  :  " + battery[0].employee_Id + "</td>")
                batteryGet.append("</tr>")
                batteryGet.append("<tr>")
                batteryGet.append("<td>" + "BATTERY ID  :  " + battery[1].id + "</td>")
                batteryGet.append("<td>" + "  BUILDING TYPE  :  " + battery[1].building_type + "</td>")
                batteryGet.append("<td>" + "  STATUS  :  " + battery[1].status + "</td>")
                batteryGet.append("<td>" + "  EMPLOYEE ID  :  " + battery[1].employee_Id + "</td>")
                batteryGet.append("</tr>")
                batteryGet.append("<tr>")
                batteryGet.append("<td>" + "BATTERY ID  :  " + battery[2].id + "</td>")
                batteryGet.append("<td>" + "  BUILDING TYPE  :  " + battery[2].building_type + "</td>")
                batteryGet.append("<td>" + "  STATUS  :  " + battery[2].status + "</td>")
                batteryGet.append("<td>" + "  EMPLOYEE ID  :  " + battery[2].employee_Id + "</td>")
                batteryGet.append("</tr>")
                batteryGet.append("<tr>")
                

                getColumnData(battery[0].id);
                getColumnData(battery[1].id);
                getColumnData(battery[2].id);
        }
    })
}

//ajax call to populate columns data
function getColumnData(batterID) {
    $.ajax({
        url: Url +"/api/Columns/"+ batterID,
        type: "get",
        data: {
            battery_id: batterID
        },
        dataType: "json",
        success: function (column) {
            let columnGet = $("#columnData")
                columnGet.append("<tr>")
                columnGet.append("<td>" + "COLUMN ID  :  " + column[0].id + "</td")
                columnGet.append("<td>" + "FLOORS  :  " + column[0].floors + "</td")
                columnGet.append("<td>" + "STATUS  :  " + column[0].status + "</td")
                columnGet.append("<td>" + "INFORMATION  :  " + column[0].information + "</td")
                columnGet.append("</tr>")
                columnGet.append("<tr>")
                columnGet.append("<td>" + "COLUMN ID  :  " + column[1].id + "</td")
                columnGet.append("<td>" + "FLOORS  :  " + column[1].floors + "</td")
                columnGet.append("<td>" + "STATUS  :  " + column[1].status + "</td")
                columnGet.append("<td>" + "INFORMATION  :  " + column[1].information + "</td")
                columnGet.append("</tr>")
                columnGet.append("<tr>")

                getElevatorData(column[0].id)
                getElevatorData(column[1].id)
                
        }
    })
}

//ajax call to populate elevator data
function getElevatorData(columnID) {
    $.ajax({
        url: Url + "/api/Elevators/" + columnID,
        type: "get",
        data: {
            column_id: columnID
        },
        dataType: "json",
        success: function (elevator) {
            console.log(elevator)
            let elevatorGet = $("#elevatorData")
                elevatorGet.append("<tr>")
                elevatorGet.append("<td>" + "ELEVATOR ID  :  " + elevator[0].id + "</td>")
                elevatorGet.append("<td>" + "  SERIAL NUMBER  :  " + elevator[0].serial_number + "</td>")
                elevatorGet.append("<td>" + "  ELEVATOR STATUS  :  " + elevator[0].elevator_status + "</td>")
                elevatorGet.append("<td>" + "  CERTIFICATE NUMBER  :  " + elevator[0].certificate + "</td>")
                elevatorGet.append("</tr>")
                elevatorGet.append("<tr>")
                elevatorGet.append("<td>" + "ELEVATOR ID  :  " + elevator[1].id + "</td>")
                elevatorGet.append("<td>" + "  SERIAL NUMBER  :  " + elevator[1].serial_number + "</td>")
                elevatorGet.append("<td>" + "  ELEVATOR STATUS  :  " + elevator[1].elevator_status + "</td>")
                elevatorGet.append("<td>" + "  CERTIFICATE NUMBER  :  " + elevator[1].certificate + "</td>")
                elevatorGet.append("</tr>")
        }
    })
}