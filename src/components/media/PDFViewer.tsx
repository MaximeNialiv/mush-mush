import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, FileText, Download } from 'lucide-react';
import { MediaMetadata } from '@/types/media';

// Configuration de react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
  metadata?: MediaMetadata;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ url, metadata }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPageNumber(1);
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Erreur lors du chargement du PDF:', error);
    setError('Impossible de charger le PDF. Veuillez vérifier le lien ou réessayer plus tard.');
    setLoading(false);
  };

  const goToPrevPage = () => {
    setPageNumber(page => Math.max(1, page - 1));
  };

  const goToNextPage = () => {
    if (numPages) {
      setPageNumber(page => Math.min(numPages, page + 1));
    }
  };

  const downloadPDF = () => {
    window.open(url, '_blank');
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
        <FileText className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="relative bg-white rounded-lg shadow-sm">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={null}
          className="flex justify-center"
        >
          <Page
            pageNumber={pageNumber}
            loading={null}
            className="max-w-full"
            scale={1.0}
          />
        </Document>
      </div>

      <div className="flex items-center justify-between mt-4 px-2">
        <div className="flex items-center space-x-4">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className={`p-2 rounded-full ${
              pageNumber <= 1
                ? 'text-gray-300'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-sm text-gray-600">
            Page {pageNumber} sur {numPages || '?'}
          </span>

          <button
            onClick={goToNextPage}
            disabled={!numPages || pageNumber >= numPages}
            className={`p-2 rounded-full ${
              !numPages || pageNumber >= numPages
                ? 'text-gray-300'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={downloadPDF}
          className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Télécharger</span>
        </button>
      </div>

      {metadata?.pageCount && (
        <div className="mt-2 text-xs text-gray-500">
          {metadata.pageCount} pages
          {metadata.fileSize && ` • ${(metadata.fileSize / 1024 / 1024).toFixed(1)} MB`}
        </div>
      )}
    </div>
  );
};
