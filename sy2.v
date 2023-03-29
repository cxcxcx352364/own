module sy2(
  input clk,
  output [7:0] sseg,
  output [7:0] dig
);
wire [3:0] digit;
count count1(
              .clk(clk),
              .digit(digit)
);

count dig_(
              .clk(clk),
              .digit(digit),
              .dig(dig)
);

count sseg_(
              .clk(clk),
              .digit(digit),
              .sseg(sseg)
);

endmodule
