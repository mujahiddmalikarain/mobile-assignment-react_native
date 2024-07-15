import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { getEmployee } from "../api/employeeApi";
import EmployeeDetail from "../components/EmployeeDetail";

const DetailScreen = ({ route }) => {
  const { id } = route.params;
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployee(id);
        setEmployee(data);
      
      } catch (error) {
     
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!employee) {
    return (
      <View style={styles.container}>
        <Text>No details found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <EmployeeDetail employee={employee} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 16,
    width: "100%",
  },
});

export default DetailScreen;
