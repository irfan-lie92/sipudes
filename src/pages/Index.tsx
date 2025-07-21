import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, TrendingUp, Library, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const books = useSelector((state: RootState) => state.books.books);
  
  const totalBooks = books.length;
  const readBooks = books.filter(book => book.isRead).length;
  const unreadBooks = totalBooks - readBooks;
  const readPercentage = totalBooks > 0 ? Math.round((readBooks / totalBooks) * 100) : 0;
  
  // Find most popular category
  const categoryCount = books.reduce((acc, book) => {
    acc[book.category] = (acc[book.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostPopularCategory = Object.entries(categoryCount).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Belum ada';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="w-full h-full bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Library className="w-4 h-4" />
                Sistem Informasi Pustaka Desa
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                SIPUDES
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Kelola koleksi buku desa dengan mudah, pantau status bacaan, dan tingkatkan literasi masyarakat
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/semua-buku">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl group">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Lihat Semua Buku
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5 transition-all duration-300">
                <TrendingUp className="w-5 h-5 mr-2" />
                Dashboard Admin
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Statistik Perpustakaan</h2>
          <p className="text-muted-foreground">Pantau perkembangan literasi di desa Anda</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-blue-700">Total Buku</CardTitle>
                <Library className="w-8 h-8 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-800">{totalBooks}</div>
              <CardDescription className="text-blue-600">Koleksi perpustakaan</CardDescription>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-green-700">Sudah Dibaca</CardTitle>
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-800">{readBooks}</div>
              <CardDescription className="text-green-600">{readPercentage}% dari total buku</CardDescription>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200/50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-orange-700">Belum Dibaca</CardTitle>
                <Users className="w-8 h-8 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-800">{unreadBooks}</div>
              <CardDescription className="text-orange-600">Menunggu untuk dibaca</CardDescription>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/50 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-purple-700">Kategori Populer</CardTitle>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800 truncate">{mostPopularCategory}</div>
              <CardDescription className="text-purple-600">Kategori terfavorit</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Fitur SIPUDES</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dilengkapi dengan berbagai fitur untuk memudahkan pengelolaan perpustakaan desa
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Manajemen Buku</CardTitle>
              <CardDescription>
                Tambah, edit, dan kelola koleksi buku dengan mudah
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Tracking Status</CardTitle>
              <CardDescription>
                Pantau status bacaan dan statistik perpustakaan real-time
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Komunitas Literasi</CardTitle>
              <CardDescription>
                Tingkatkan minat baca dan literasi masyarakat desa
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
