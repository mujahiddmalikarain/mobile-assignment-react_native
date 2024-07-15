import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmployeeDetail = ({ employee }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{employee.employee_name}</Text>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{employee.employee_age}</Text>
        <Text style={styles.label}>Salary:</Text>
        <Text style={styles.value}>{employee.employee_salary}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
    width: '100%', // Ensures the card takes up full width
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});

export default EmployeeDetail;
