<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

$action = $_REQUEST['action'] ?? '';

try {
    switch($action) {
        case 'salvar':
            $stmt = $pdo->prepare("INSERT INTO despesas 
                (data_despesa,descricao, valor, tipo) 
                VALUES (now(),?, ?, ?)");
            
            $success = $stmt->execute([
                $_POST['descricao'],
                $_POST['valor'],
                $_POST['tipo']
            ]);
            
            echo json_encode(['success' => $success, 'message' => 'Despesa salva com sucesso']);
            break;
            
        case 'listar':
            $stmt = $pdo->query("SELECT * FROM despesas ORDER BY data_despesa DESC LIMIT 10");
            $despesas = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode(['success' => true, 'data' => $despesas]);
            break;
            
        default:
            echo json_encode(['success' => false, 'message' => 'Ação inválida']);
    }
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}