import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { ExpenseReport } from '../../types/report';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    color: '#0284c7', // primary-600
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
  userInfo: {
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
  },
  userInfoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 100,
    fontSize: 10,
    color: '#666',
  },
  value: {
    flex: 1,
    fontSize: 10,
  },
  summary: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#f0f9ff', // primary-50
    borderRadius: 5,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0284c7', // primary-600
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  summaryItem: {
    flex: 1,
    minWidth: '45%',
  },
  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 8,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 8,
    fontSize: 9,
  },
  tableCell: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    color: '#666',
    textAlign: 'center',
    borderTop: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
  },
});

interface ExpenseReportPDFProps {
  data: ExpenseReport;
}

export function ExpenseReportPDF({ data }: ExpenseReportPDFProps) {
  const totalIncome = data.user.monthlySalary;
  const totalExpenses = data.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const savings = totalIncome - totalExpenses;
  const savingsPercentage = ((savings / totalIncome) * 100).toFixed(1);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Expense Report</Text>
            <Text style={styles.subtitle}>Period: {data.period}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.subtitle}>
              Generated: {new Date(data.generatedAt).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* User Information */}
        <View style={styles.userInfo}>
          <View style={styles.userInfoRow}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{data.user.fullName}</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{data.user.email}</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.label}>Mobile:</Text>
            <Text style={styles.value}>{data.user.mobileNumber}</Text>
          </View>
        </View>

        {/* Financial Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Financial Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.label}>Total Income:</Text>
              <Text style={styles.value}>₹{totalIncome.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.label}>Total Expenses:</Text>
              <Text style={styles.value}>₹{totalExpenses.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.label}>Savings:</Text>
              <Text style={styles.value}>₹{savings.toLocaleString()} ({savingsPercentage}%)</Text>
            </View>
          </View>
        </View>

        {/* Expenses Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>Date</Text>
            <Text style={styles.tableCell}>Category</Text>
            <Text style={styles.tableCell}>Description</Text>
            <Text style={styles.tableCell}>Amount</Text>
          </View>

          {data.expenses.map((expense, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>
                {new Date(expense.date).toLocaleDateString()}
              </Text>
              <Text style={styles.tableCell}>{expense.category}</Text>
              <Text style={styles.tableCell}>{expense.description}</Text>
              <Text style={styles.tableCell}>₹{expense.amount.toLocaleString()}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>
          Generated by ExpenseTracker • This is an automatically generated report
        </Text>
      </Page>
    </Document>
  );
}