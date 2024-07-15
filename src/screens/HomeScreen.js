import React, { useEffect, useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, Button, Modal, Text, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/employeeApi';
import EmployeeList from '../components/EmployeeList';
import { storeData, getData } from '../utils/cache';

const HomeScreen = ({ navigation }) => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [age, setAge] = useState('');

  const fetchEmployees = async () => {
    const cachedData = await getData('employees');
    if (cachedData) {
      setEmployees(cachedData);
    } else {
      const data = await getEmployees();
      setEmployees(data);
      storeData('employees', data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEmployees();
    }, [])
  );

  const handleCreate = async () => {
    try {
      const newEmployee = { name, salary, age };
      await createEmployee(newEmployee);
      Alert.alert('Success', 'Employee created successfully');
      setModalVisible(false);
      setName('');
      setSalary('');
      setAge('');
      fetchEmployees();
    } catch (error) {
      Alert.alert('Error', 'Failed to create employee');
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedEmployee = { name, salary, age };
      await updateEmployee(currentEmployee.id, updatedEmployee);
      Alert.alert('Success', 'Employee updated successfully');
      setModalVisible(false);
      setIsUpdating(false);
      setCurrentEmployee(null);
      setName('');
      setSalary('');
      setAge('');
      fetchEmployees();
    } catch (error) {
      Alert.alert('Error', 'Failed to update employee');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      Alert.alert('Success', 'Employee deleted successfully');
      fetchEmployees(); 
    } catch (error) {
      Alert.alert('Error', 'Failed to delete employee');
    }
  };

  const handleSelect = (id) => {
    navigation.navigate('Detail', { id });
  };

  const handleEdit = (id) => {
    const employee = employees.find(emp => emp.id === id);
    setCurrentEmployee(employee);
    setName(employee.employee_name);
    setSalary(employee.employee_salary);
    setAge(employee.employee_age);
    setIsUpdating(true);
    setModalVisible(true);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.employee_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search employees"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Create Employee" onPress={() => setModalVisible(true)} />
      <EmployeeList employees={filteredEmployees} onSelect={handleSelect} onUpdate={handleEdit} onDelete={handleDelete} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{isUpdating ? 'Update Employee' : 'Create New Employee'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Salary"
              value={salary}
              onChangeText={setSalary}
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              value={age}
              onChangeText={setAge}
            />
            <View style={styles.buttonContainer}>
              <Button title={isUpdating ? "Update" : "Create"} onPress={isUpdating ? handleUpdate : handleCreate} />
              <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default HomeScreen;
