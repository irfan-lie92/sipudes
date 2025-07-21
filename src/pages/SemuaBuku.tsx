import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleReadStatus } from '@/store/booksSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2, Circle, Book, Calendar, User, Hash } from 'lucide-react';

const SemuaBuku = () => {
  const { books, loading, error } = useAppSelector(state => state.books);
  const dispatch = useAppDispatch();

  const handleToggleReadStatus = (bookId: string) => {
    dispatch(toggleReadStatus(bookId));
  };

  const getReadStatusBadge = (isRead: boolean) => {
    return (
      <Badge 
        variant={isRead ? "default" : "secondary"} 
        className="flex items-center gap-1"
      >
        {isRead ? (
          <>
            <CheckCircle2 className="h-3 w-3" />
            Sudah Dibaca
          </>
        ) : (
          <>
            <Circle className="h-3 w-3" />
            Belum Dibaca
          </>
        )}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat data buku...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Terjadi kesalahan: {error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Muat Ulang
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Book className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Semua Buku</h1>
          </div>
          <p className="text-muted-foreground">
            Daftar lengkap koleksi buku perpustakaan desa beserta status bacanya
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Daftar Buku Perpustakaan</span>
              <Badge variant="outline" className="text-sm">
                Total: {books.length} buku
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {books.length === 0 ? (
              <div className="text-center py-12">
                <Book className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  Belum ada buku
                </h3>
                <p className="text-sm text-muted-foreground">
                  Koleksi buku akan tampil di sini setelah ditambahkan
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">
                        <div className="flex items-center gap-2">
                          <Book className="h-4 w-4" />
                          Judul Buku
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Penulis
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4" />
                          ISBN
                        </div>
                      </TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Tahun Terbit
                        </div>
                      </TableHead>
                      <TableHead>Status Baca</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {books.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell className="font-medium">
                          <div>
                            <p className="font-semibold text-foreground">{book.title}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {book.author}
                        </TableCell>
                        <TableCell className="font-mono text-sm text-muted-foreground">
                          {book.isbn}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{book.category}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {book.publicationYear}
                        </TableCell>
                        <TableCell>
                          {getReadStatusBadge(book.isRead)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleReadStatus(book.id)}
                            className="text-xs"
                          >
                            {book.isRead ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Book className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Buku</p>
                  <p className="text-2xl font-bold">{books.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sudah Dibaca</p>
                  <p className="text-2xl font-bold text-green-600">
                    {books.filter(book => book.isRead).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-full">
                  <Circle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Belum Dibaca</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {books.filter(book => !book.isRead).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SemuaBuku;