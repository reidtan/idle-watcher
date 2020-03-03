let _modPath;
let idlers = "";

exports.initialize = (modPath) => {
    _modPath = modPath
};

exports.onLoadGame = settings => {
};

exports.onNewHour = settings => {
    Helpers.GetAllEmployees().forEach(emp => {
        let staff = `${emp.originalName}-${emp.employeeTypeName}`;
        if(isIdling(emp)) {
            newIdler = !isInIdlersList(staff, idlers);

            // new idler, notify and add to idlers list
            if (newIdler) {
                let message = `
                    <strong>You have idling employees!!!</strong><br><br>
                    ${emp.name} (${emp.employeeTypeName}) is idling!
                `
                Helpers.ShowNotification(message, "yellow", 10);
                idlers = addToIdlers(staff, idlers);
            }
        }
        // remove from idlers if not idling but in idlers list 
        else {
            if (isInIdlersList(staff, idlers)) {
                idlers = removeNonIdlers(staff, idlers);
            }
        }
    })
};

exports.onBackgroundWorkerStart = () => {};
exports.onNewDay = settings =>  {};
exports.onUnsubscribe = done => {};

function isIdling(emp) {
    return emp.idleMinutes > 0 && emp.employeeTypeName !== "Supporter";
}

function isInIdlersList(idler, list) {
    return list.includes(idler);
}

function addToIdlers(idler, list) {
    return `${list}${idler}|`
}

function removeNonIdlers(idler, list) {
    return list.replace(`${idler}|`, '');
}