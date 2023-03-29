module dig(
  input clk,
  input digit,
  output [7:0] dig
);
reg [3:0] dig;
always @(posedge clk) begin
  case (digit)
    4'd0: dig <= 8'b00000000; // 第一位
    4'd1: dig <= 8'b00000000; // 第二位
    4'd2: dig <= 8'b00000000; // 第三位
    4'd3: dig <= 8'b00000000; // 第四位
    4'd4: dig <= 8'b00000000; // 第五位
    4'd5: dig <= 8'b00000000; // 第六位
    4'd6: dig <= 8'b00000000; // 第七位
    4'd7: dig <= 8'b00000000; // 第八位
    default: dig <= 8'b00000000; // 不显示
endcase
end
endmodule