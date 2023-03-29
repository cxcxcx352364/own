module sseg(
  input clk,
  input digit,
  output [7:0] sseg
);
reg [7:0] digit;
reg [7:0] sseg;

always @(posedge clk) begin
  case (digit)
    4'd0: sseg <= 8'h40; // 0
    4'd1: sseg <= 8'h79; // 1
    4'd2: sseg <= 8'h24; // 2
    4'd3: sseg <= 8'h30; // 3
    4'd4: sseg <= 8'h19; // 4
    4'd5: sseg <= 8'h12; // 5
    4'd6: sseg <= 8'h02; // 6
    4'd7: sseg <= 8'h78; // 7
    4'd8: sseg <= 8'h00; // 8
    4'd9: sseg <= 8'h10; // 9
    4'd10: sseg <= 8'h08; // A
    4'd11: sseg <= 8'h03; // b
    4'd12: sseg <= 8'h46; // C
    4'd13: sseg <= 8'h21; // d
    4'd14: sseg <= 8'h06; // E
    4'd15: sseg <= 8'h0e; // F
    default: sseg <= 8'hff; // 显示空白
  endcase
end
endmodule
