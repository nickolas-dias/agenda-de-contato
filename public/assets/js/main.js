const app = angular.module('agenda-de-contato', []);


app.controller("AgendaController", ($scope, $http) =>{
    $scope.contactName = '';
    $scope.contactPhone = '';
    $scope.contactList = [];

    $scope.addContact = () => {
        if (!$scope.contactName || !$scope.contactPhone){
            return alert("Digite em todos os campos.")
        }
        $http.post("http://localhost:4444/api/contacts", 
            { name: $scope.contactName, number: $scope.contactPhone })
        .then(() => {
            $scope.loadContactList()
            $scope.contactName = '';
            $scope.contactPhone = '';
        }, () => {
            alert("Aconteceu algum erro")
        })
    }

    $scope.deleteContact = (id) => {
        $http.delete('http://localhost:4444/api/contacts/' + id).then(() =>{
            $scope.loadContactList()
        })
    }

    $scope.updateContact = (id) => {
        const contact = $scope.contactList.find(contact => contact.id === id)

        $http.patch('http://localhost:4444/api/contacts/' + id, contact)
        .then(() => {
            $scope.loadContactList()
        })
    }

    $scope.loadContactList = async () => {
        try {
            const { data } = await $http.get('http://localhost:4444/api/contacts');
            $scope.contactList = data;
            $scope.$apply();
        } catch (error) {
            console.error("Erro ao carregar lista de contatos:", error);
        }
    }
    $scope.loadContactList();
})
