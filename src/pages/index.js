import { useQuery, useMutation } from "@tanstack/react-query";
import { getColmeias, deleteColmeia } from "../services/api";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Importando o ícone de edição
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  // Query para buscar as colmeias
  const { data: colmeias, refetch } = useQuery({
    queryKey: ["colmeias"],
    queryFn: getColmeias,
  });
  // Mutação para deletar uma colmeia
  const mutationDelete = useMutation({
    mutationFn: deleteColmeia,
    onSuccess: () => {
      refetch(); // Recarrega a lista de colmeias após a exclusão
    },
  });

  // Função para navegar para a página de edição
  const handleEdit = (id) => {
    router.push(`/editar-colmeia/${id}`);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Monitoramento de Colmeias
      </Typography>
      <Button variant="contained" color="primary" onClick={() => router.push("/nova-colmeia")} style={{ marginBottom: '16px' }}>
        Nova Colmeia
      </Button>
      <List>
        {colmeias?.map((colmeia) => (
          <ListItem
            key={colmeia.id}
            secondaryAction={
              <Box>
                <IconButton edge="end" onClick={() => handleEdit(colmeia.id)} style={{ marginRight: '8px' }}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton edge="end" onClick={() => mutationDelete.mutate(colmeia.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            }
          >
            <ListItemText
              primary={colmeia.nome}
              secondary={`Localização: ${colmeia.localizacao}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
