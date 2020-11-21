@WebServlet("/login")
public class MyLogin extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        String name = request.getParameter("name");
        String pass = request.getParameter("passwd");

        if (name == null || pass == null) {
            out.println("Chyba: chybi parametr 'name' nebo 'passwd'");
        } else {
          if (name.contai) {

          }
            String jdbcURL = System.getenv("JDBC_DATABASE_URL");

            try (Connection conn = DriverManager.getConnection(jdbcURL)) {
                try (Statement stmt = conn.createStatement()) {
                    String sql = "SELECT * FROM users WHERE name = ? AND passwd = ?";
                    preparedStatement = connection.prepareStatement(sql);
                    preparedStatement.setString(1,name);
                    preparedStatement.setString(1,pass);
                    ResultSet rs = preparedStatement.executeUpdate();

                    if (rs.next()) {
                        out.println("OK");
                    } else {
                        out.println("spatne jmeno nebo heslo počkejte 15 sekund");
                        long static currentTime = System.currentTimeMillis();
                        while(currentTime >  (System.currentTimeMillis()+15000) ){

                        }

                    }
                }
            } catch (SQLException ex) {
               out.println("Chyba: chyba pri praci s databazi:\n\n" + ex);
            }
        }

        out.println("</body></html>");
    }
}
