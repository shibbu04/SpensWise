import React from 'react';
import { X } from 'lucide-react';
import { PDFViewer } from '@react-pdf/renderer';
import { ExpenseReportPDF } from './ExpenseReportPDF';
import { ExpenseReport } from '../../types/report';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ExpenseReport;
}

export function ReportModal({ isOpen, onClose, data }: ReportModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed inset-4 rounded-xl bg-white p-6 shadow-xl dark:bg-dark-card lg:inset-x-auto lg:left-1/2 lg:w-[800px] lg:-translate-x-1/2">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
            Expense Report Preview
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-bg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="h-[calc(100%-88px)]">
          <PDFViewer width="100%" height="100%" className="rounded-lg">
            <ExpenseReportPDF data={data} />
          </PDFViewer>
        </div>
      </div>
    </>
  );
}