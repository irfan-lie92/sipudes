import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publicationYear: number;
  isRead: boolean;
  createdAt: string;
}

interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [
    // Sample data for demonstration
    {
      id: '1',
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      isbn: '978-979-22-3272-4',
      category: 'Fiksi',
      publicationYear: 2005,
      isRead: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Ayat-Ayat Cinta',
      author: 'Habiburrahman El Shirazy',
      isbn: '978-979-22-1823-0',
      category: 'Religi',
      publicationYear: 2004,
      isRead: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Bumi Manusia',
      author: 'Pramoedya Ananta Toer',
      isbn: '978-979-22-0001-1',
      category: 'Sejarah',
      publicationYear: 1980,
      isRead: true,
      createdAt: new Date().toISOString(),
    },
  ],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Omit<Book, 'id' | 'createdAt'>>) => {
      const newBook: Book = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.books.push(newBook);
    },
    toggleReadStatus: (state, action: PayloadAction<string>) => {
      const book = state.books.find(book => book.id === action.payload);
      if (book) {
        book.isRead = !book.isRead;
      }
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  addBook, 
  toggleReadStatus, 
  updateBook, 
  deleteBook, 
  setLoading, 
  setError 
} = booksSlice.actions;

export default booksSlice.reducer;