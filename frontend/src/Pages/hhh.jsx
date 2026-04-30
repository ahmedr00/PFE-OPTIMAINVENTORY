<Card className="shadow-card lg:col-span-2">
  <CardHeader className="pb-2">
    <CardTitle className="text-base font-semibold text-foreground">
      Activité de comptage
    </CardTitle>
  </CardHeader>
  <CardContent>
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(160,84%,39%)" stopOpacity={0.3} />
            <stop offset="100%" stopColor="hsl(160,84%,39%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "hsl(215,16%,47%)" }}
        />
        <YAxis tick={{ fontSize: 12, fill: "hsl(215,16%,47%)" }} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="comptages"
          stroke="hsl(160,84%,39%)"
          fill="url(#emeraldGrad)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  </CardContent>
</Card>;

<Card className="lg:col-span-2">
  <CardHeader>
    <CardTitle>Activité des 4 Derniers Jours</CardTitle>
  </CardHeader>
  <CardContent>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={activityData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="fiches" fill="#10b981" name="Fiches créées" />
        <Bar dataKey="comptages" fill="#3b82f6" name="Comptages" />
        <Bar dataKey="ecarts" fill="#f97316" name="Écarts" />
      </BarChart>
    </ResponsiveContainer>
  </CardContent>
</Card>;
