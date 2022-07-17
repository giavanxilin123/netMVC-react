using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class UpdateRatingMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Rating");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Rating",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Rating_Username",
                table: "Rating",
                column: "Username");

            migrationBuilder.AddForeignKey(
                name: "FK_Rating_User_Username",
                table: "Rating",
                column: "Username",
                principalTable: "User",
                principalColumn: "Username",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rating_User_Username",
                table: "Rating");

            migrationBuilder.DropIndex(
                name: "IX_Rating_Username",
                table: "Rating");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "Rating");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Rating",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
