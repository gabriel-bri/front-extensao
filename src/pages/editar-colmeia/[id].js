import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getColmeiaById, updateColmeia } from "../../services/api";
import { useRouter } from "next/router";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function EditarColmeia() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({ nome: "", localizacao: "", temperatura: "", umidade: "" });
  
  // Buscar dados da colmeia pelo ID
  const { data: colmeia, isLoading, isError } = useQuery({
    queryKey: ['colmeia', id],
    queryFn: () => getColmeiaById(id),
    enabled: !!id, // Só executa a query quando o ID estiver disponível
    onSuccess: (data) => {
      // Preencher o formulário com os dados recebidos
      setForm({
        nome: data.nome || "",
        localizacao: data.localizacao || "",
        temperatura: data.temperatura?.toString() || "",
        umidade: data.umidade?.toString() || ""
      });
    }
  });
  
  // Mutation para atualizar a colmeia
  const mutation = useMutation({
    mutationFn: (dados) => updateColmeia(id, dados),
    onSuccess: () => {
      console.log("Colmeia atualizada com sucesso!");
      router.push("/");
    },
    onError: (error) => {
      console.error("Erro ao atualizar colmeia:", error);
    },
  });
  
  const handleSubmit = () => {
    // Convertendo os campos numéricos para Float antes de enviar
    const dadosProcessados = {
      nome: form.nome,
      localizacao: form.localizacao,
      temperatura: form.temperatura ? parseFloat(form.temperatura) : null,
      umidade: form.umidade ? parseFloat(form.umidade) : null
    };
    
    console.log("Dados processados para atualização:", dadosProcessados);
    mutation.mutate(dadosProcessados);
  };
  
  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }
  
  if (isError || !colmeia) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">Erro ao carregar dados da colmeia. Verifique se o ID está correto.</Alert>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
          onClick={() => router.push("/")}
        >
          Voltar
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>Editar Colmeia</Typography>
      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
      />
      <TextField
        label="Localização"
        fullWidth
        margin="normal"
        value={form.localizacao}
        onChange={(e) => setForm({ ...form, localizacao: e.target.value })}
      />
      <TextField
        label="Temperatura"
        type="number"
        fullWidth
        margin="normal"
        value={form.temperatura}
        onChange={(e) => setForm({ ...form, temperatura: e.target.value })}
      />
      <TextField
        label="Umidade"
        type="number"
        fullWidth
        margin="normal"
        value={form.umidade}
        onChange={(e) => setForm({ ...form, umidade: e.target.value })}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={mutation.isLoading}
        sx={{ mt: 2 }}
      >
        {mutation.isLoading ? "Salvando..." : "Salvar Alterações"}
      </Button>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => router.push("/")}
        sx={{ mt: 2 }}
      >
        Cancelar
      </Button>
    </Container>
  );
}
