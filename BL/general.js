General = DL => {

    async function full_login(id) {
        // TODO: בדיקות תקינות ל-id
        const person = await getPersonById(id);
        if (person) {
            let person_statuses = await getStatusPersonById(person.person_id);
            
            const now = new Date()
            console.log(person_statuses.date)
            if (!person_statuses || new Date(person_statuses.date) <= new Date(now.setHours(now.getHours() - 1)))
                person_statuses={}
                person_statuses.status_id = await createStatusPerson(id)

            console.log(person_statuses)
            let course_values = await getCourseValuesById(person.course_id)

            if (!course_values) {
                return {}
            }
            //return to UI 
            let res = {
                // person: person,
                person_id:person.person_id,
                full_name: person.f_name + ' ' +person.l_name,
                details: person.details,
                status_person: person_statuses.status_id,
                course_data: course_values
            }
            console.log(res)
            console.log("**************** End Person *******************")
            return res
        }
        else {
            console.log("**************** End *******************")
            return getDefaultCourseValues();
        }

    }

    //#region --- Function of full_login ----
    async function getPersonById(id) {
        let res = await DL.read("Persons", { "person_id": id })
        if (res.length) {
            return res[0];
        }
        return {}
    }

    async function getStatusPersonById(id) {
        let res = await DL.read("Status_Person", { "person_id": id })
        if (!res) return {}

        let maxDate = new Date(Math.max.apply(null, res.map(e => {
            return new Date(e.date);
        })));
        let maxDateObject = res.filter(e => {
            let d = new Date(e.date);
            return d.getTime() == maxDate.getTime();
        })[0];

        return maxDateObject;
    }

    async function createStatusPerson(id) {

        let table = 'Status_Person', date = new Date().getTime();
        
        try {
            let query_string = `INSERT INTO ${table} (person_id, status_id, date) VALUES ('${id}', '0', '${date}')`
            let res = await DL.create(query_string)
            return 0;
        }
        catch (err) {
            throw err
        }
    }

    async function getCourseValuesById(course_id) {
        let res = await DL.read("Course_Values", { "course_id": course_id })
        if (res.length) {
            return res[0];
        }
        return {}
    }

    function getDefaultCourseValues() {
        // console.log("getDefaultCourseValues")

        return {
            id: 2,
            text: "asdasdas",
            lauter: "kajsdfsdkjfsd<br>sdafsa",
            date: Date.now()
        }
    }
    //#endregion


    async function update_status(person_id, status_id) {
        max_status = await getStatusPersonById(person_id)
        let table = 'Status_Person', date = new Date().getTime();
        try {
            let query_string = `UPDATE ${table} SET status_id= ${status_id},date= '${date}' 
            WHERE person_id=${person_id} AND status_person_id = ${max_status.status_person_id}`
            let res = await DL.update(query_string)
            return true;
        }
        catch (err) {
            return false
            throw err
        }

    }

    return { full_login, update_status }

}

module.exports = General