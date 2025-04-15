import javax.swing.*;
import java.awt.*;

public class ConsultaIPSwing {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("Consultar IP");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setSize(400, 300);
            frame.setLocationRelativeTo(null); // Centraliza a janela

            // Painel com camadas
            JLayeredPane layeredPane = new JLayeredPane();
            layeredPane.setPreferredSize(new Dimension(400, 300));

            // Fundo com GIF animado
            JLabel background = new JLabel(new ImageIcon("fundo.gif")); // Coloque o fundo.gif na pasta raiz
            background.setBounds(0, 0, 400, 300);
            layeredPane.add(background, Integer.valueOf(0)); // Camada de fundo

            // Painel translúcido central
            JPanel panel = new JPanel();
            panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
            panel.setBackground(new Color(0, 0, 0, 130)); // Vidro preto com transparência
            panel.setBounds(50, 60, 300, 180);

            // Componentes da interface
            JLabel titulo = new JLabel("CONSULTAR IP");
            titulo.setForeground(Color.WHITE);
            titulo.setFont(new Font("Arial", Font.BOLD, 18));
            titulo.setAlignmentX(Component.CENTER_ALIGNMENT);

            JTextField campo = new JTextField();
            campo.setMaximumSize(new Dimension(280, 30));
            campo.setAlignmentX(Component.CENTER_ALIGNMENT);

            JButton botao = new JButton("CONSULTAR");
            botao.setAlignmentX(Component.CENTER_ALIGNMENT);
            botao.setFocusPainted(false);

            // Ação do botão (a lógica real da consulta pode ser implementada depois)
            botao.addActionListener(e -> {
                String ip = campo.getText();
                JOptionPane.showMessageDialog(frame, "Você digitou o IP: " + ip);
            });

            // Adicionando ao painel
            panel.add(titulo);
            panel.add(Box.createRigidArea(new Dimension(0, 15)));
            panel.add(campo);
            panel.add(Box.createRigidArea(new Dimension(0, 10)));
            panel.add(botao);

            layeredPane.add(panel, Integer.valueOf(1)); // Camada superior

            frame.setContentPane(layeredPane);
            frame.setVisible(true);
        });
    }
                                   }
