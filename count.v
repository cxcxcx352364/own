module count(
  input clk,
  output digit
);
reg [31:0] count;
wire [3:0] digit;
reg [3:0] data;

always @(posedge clk) 
        count <= count + 1;
    if (count == 24000000) begin
        count <= 0;
        data <= data + 1;end
    if (data == 16) 
        data <= 0;

assign digit=data;
//=
endmodule
