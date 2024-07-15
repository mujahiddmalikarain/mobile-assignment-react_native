import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EmployeeList = ({ employees, onSelect, onUpdate, onDelete }) => {
  return (
    <FlatList
      data={employees}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.itemContent} onPress={() => onSelect(item.id)}>
            <View>
              <Text style={styles.nameText}>{item.employee_name}</Text>
              <Text style={styles.ageText}>{item.employee_age} years old</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.icon} onPress={() => onUpdate(item.id)}>
              <Icon name="edit" size={24} color="#007bff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={() => onDelete(item.id)}>
              <Icon name="delete" size={24} color="#ff0000" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  itemContent: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  ageText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 8,
  },
});

export default EmployeeList;
