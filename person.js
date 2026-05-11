
const loadPersons = async () => {
    const response = await fetch(
        "https://gegevensmagazijn.tweedekamer.nl/OData/v4/2.0/persoon?$filter=Verwijderd%20eq%20false%20and%20(Functie%20eq%20'Tweede%20Kamerlid')&$format=application/json;odata.metadata=full"
    );

    if (!response.ok) {
        throw new Error(`HTTP error! ${response.status}`);
    }

    const data = await response.json();

    return await Promise.all(data.value.map(person => ({
        ...person,
        image: `https://gegevensmagazijn.tweedekamer.nl/OData/v4/2.0/Persoon/${person.Id}/resource`,
        fractie: getFractiesOfPerson(person[`ActiviteitActor@odata.navigationLink`])
    })));
}

const getFractiesOfPerson = async (apiCall) => {
    const response = await fetch(
        apiCall
    );

    if (!response.ok) {
        throw new Error(`HTTP error! ${response.status}`);
    }
    const data = await response.json();

    if (data.value && data.value.length > 0) {
            const lastItem = data.value[data.value.length - 1];
            return lastItem.ActorFractie || "";
    }
    return "";
}

export { loadPersons, getFractiesOfPerson };
