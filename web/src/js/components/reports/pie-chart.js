import d3 from 'd3';

export default function pie_chart(data, labels, chartSelector, options) {

  let chartSize = {
    width: options.width || 500,
    height: options.height || 500,
    outerRadius: 120,
    innerRadius: 40
  };

  var vis = d3.select(chartSelector).append('svg')
    .attr('width', chartSize.width)
    .attr('height', chartSize.height);

  let pie = d3.layout.pie().sort(null);

  createArcs(vis, chartSize, pie, data, labels);
  createTicks(vis, chartSize, pie, data);
  createTotal(vis, chartSize, data);
}

function createArcs(vis, chartSize, pie, data, labels) {

  let colorScale = d3.scale.category20();
  let arc = d3.svg.arc().innerRadius(chartSize.innerRadius).outerRadius(chartSize.outerRadius);

  var arcs = vis.selectAll('g.arc')
    .data(pie(data))
    .enter().append('g')
    .attr('class', 'arc')
    .attr('transform', 'translate(' + (chartSize.width/2) + ',' + (chartSize.height/2) + ')');

  arcs.append('path')
    .attr('fill', (d, i) => colorScale(i))
    .attr('d', arc);

  let labelGroups = arcs.append('g')
    .attr('transform', d => {
      let c = arc.centroid(d);
      return 'translate(' + c[0]*1.7 +"," + c[1]*1.7 + ')';
    })
    .attr('display', d => d.value > 1 ? null : 'none')
    .attr('text-anchor', d => isRightHalf(d) ? 'beginning' : 'end');

  labelGroups.append('text')
    .attr('class', 'arc-amount')
    .attr('dy', d => isTopHalf(d) ? 20 : 5)
    .text(d => formatMoney(d.value));

  labelGroups.append('text')
    .attr('class', 'arc-label')
    .attr('dy', d => isTopHalf(d) ? 5 : -10)
    .text((d, i) => labels[i]);
}

function isRightHalf(data) {
  return (data.startAngle+data.endAngle)/2 < Math.PI;
}

function isTopHalf(data) {
  return (data.startAngle+data.endAngle)/2 > Math.PI/2 && (data.startAngle+data.endAngle)/2 < Math.PI*1.5;
}

function createTicks(vis, chartSize, pie, data) {

  let tickGroup = vis.append('g')
    .attr('class', 'tick')
    .attr('transform', 'translate(' + (chartSize.width/2) + ',' + (chartSize.height/2) + ')');

  let lines = tickGroup.selectAll('line').data(pie(data));

  lines.enter().append('line')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', -chartSize.outerRadius-3)
    .attr('y2', -chartSize.outerRadius-8)
    .attr('stroke', 'gray')
    .attr('transform', d => 'rotate(' + (d.startAngle+d.endAngle)/2 * (180/Math.PI) + ')');
}

function createTotal(vis, chartSize, data) {
  let totalGroup = vis.append('g')
    .attr('class', 'total-group')
    .attr('transform', 'translate(' + (chartSize.width/2) + ',' + (chartSize.height/2) + ')');

  totalGroup.append('circle')
    .attr('fill', 'white')
    .attr('r', chartSize.innerRadius);

  totalGroup.append('text')
    .attr('class', 'total-label')
    .attr('dy', -10)
    .attr('text-anchor', 'middle')
    .text('TOTAL');

  let total = formatMoney(data.reduce((a, b) => a + b));

  totalGroup.append('text')
    .attr('class', 'total-amount')
    .attr('dy', 10)
    .attr('text-anchor', 'middle')
    .text(total);
}

function formatMoney(dollarAmount) {
  return `$${dollarAmount.toFixed(2)}`;
}