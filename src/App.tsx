import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import DashboardPage from './pages/DashboardPage'
import OperacoesPage from './pages/OperacoesPage'
import OperacaoDetalhesPage from './pages/OperacaoDetalhesPage'
import NovaOperacaoPage from './pages/NovaOperacaoPage'
import EditarOperacaoPage from './pages/EditarOperacaoPage'
import ImportacaoPage from './pages/ImportacaoPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-gray-50 min-h-screen">
        <Navbar />
        <main className="ml-64 flex-1 min-h-screen">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/operacoes" element={<OperacoesPage />} />
            <Route path="/operacoes/nova" element={<NovaOperacaoPage />} />
            <Route path="/operacoes/:id" element={<OperacaoDetalhesPage />} />
            <Route path="/operacoes/:id/editar" element={<EditarOperacaoPage />} />
            <Route path="/importacao" element={<ImportacaoPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
